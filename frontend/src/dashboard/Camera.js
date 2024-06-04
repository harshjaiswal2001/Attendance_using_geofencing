import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import AuthContext from '../AuthContext';

function Camera({ setRecognizedFace }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    const [labels, setLabels] = useState([]);

    const { isLoggedIn } = React.useContext(AuthContext);

    const loadLabels = async () => {
        axios.get('http://127.0.0.1:5000/users/userids')
            .then(response => {
                setLabels(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        const loadModels = async () => {
            await loadLabels()
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/facemodels'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/facemodels'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/facemodels'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('/facemodels')  // Assuming SSD Mobilenet V1 model
            ]);
            setModelsLoaded(true);
            startVideo();
        };
        loadModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("Error accessing the camera: ", err);
            });
    };

    const handleImageRecognition = async () => {
        try {
            const canvas = faceapi.createCanvasFromMedia(videoRef.current);
            document.body.append(canvas); // If you need to see the canvas or its debugging visuals
            const displaySize = { width: videoRef.current.offsetWidth, height: videoRef.current.offsetHeight };
            faceapi.matchDimensions(canvas, displaySize);

            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();
            if (detections.length === 0) {
                console.log("No faces detected.");
                return;
            }
            const labeledFaceDescriptors = await loadLabeledImages();
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
            const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
            results.forEach(result => {
                console.log('result: ', result)
                console.log('isLoggedIn: ', isLoggedIn._id)
                if (result.label === isLoggedIn._id) {
                    alert('Face Recognized! Welcome back, ' + isLoggedIn.fullName + '!' + 'Your Attendence will be recorded.');
                    setRecognizedFace(true);
                }
                // console.log(result.toString())
            }
            );
        } catch (error) {
            console.error("Failed in face recognition:", error);
        }
    };


    // Simulate loading of labeled images from photos directory
    const loadLabeledImages = async () => {
        // Assuming 'labels' is available in this scope; otherwise, it needs to be passed as a parameter or defined globally
        const promises = labels.map(async label => {
            const img = await faceapi.fetchImage(`/photos/${label}.jpg`);
            console.log("Checking label: ", label);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            if (detections) {  // Ensure detections is not null
                // console.log(`Descriptors for ${label}`, detections.descriptor);
                return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]); // Assuming you want an array of descriptors per label
            } else {
                console.log(`No detections for ${label}`);
                return new faceapi.LabeledFaceDescriptors(label, []); // Return label with an empty descriptor array if no face is detected
            }
        });

        return Promise.all(promises); // This will now wait for all mapped promises to resolve
    };


    return (
        <div>
            <h1>Camera App</h1>
            <video ref={videoRef} style={{ width: '100%' }} autoPlay muted></video>
            <button onClick={handleImageRecognition}>Recognize Faces</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}

export default Camera;
