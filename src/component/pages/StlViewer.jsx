import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box, Button, Typography } from '@mui/material';

const StlViewer = () => {
  const stlContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    if (!stlContainerRef.current) return;

    // Initialize Scene
    sceneRef.current = new THREE.Scene();

    // Camera Setup
    const aspectRatio = stlContainerRef.current.clientWidth / stlContainerRef.current.clientHeight;
    cameraRef.current = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    cameraRef.current.position.set(0, 0, 3);

    // Renderer Setup
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(stlContainerRef.current.clientWidth, stlContainerRef.current.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.outputEncoding = THREE.LinearSRGBColorSpace;
    rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current.toneMappingExposure = 1.0;
    stlContainerRef.current.appendChild(rendererRef.current.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(ambientLight, directionalLight);

    // Controls
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.1;

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (stlContainerRef.current && cameraRef.current && rendererRef.current) {
        const width = stlContainerRef.current.clientWidth;
        const height = stlContainerRef.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      rendererRef.current.dispose();
    };
  }, []);

  const loadSTLModel = (file) => {
    setShowPlaceholder(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result;

      if (!buffer || buffer.byteLength === 0) {
        console.error('Invalid STL file');
        return;
      }

      const loader = new STLLoader();
      const geometry = loader.parse(buffer);
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        metalness: 0.3,
        roughness: 0.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;
      mesh.scale.set(0.2, 0.2, 0.2);

      // Remove previous models before adding a new one
      sceneRef.current.children = sceneRef.current.children.filter((child) => !(child instanceof THREE.Mesh));
      sceneRef.current.add(mesh);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 1,
        backgroundColor: '#f1f3f5',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* File Upload Button */}
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: '#343a40',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5a6268',
          },
          textTransform: 'none',
        }}
      >
        Upload STL File
        <input type="file" accept=".stl" hidden onChange={(e) => e.target.files && loadSTLModel(e.target.files[0])} />
      </Button>

      {/* STL Viewer */}
      <Box
        ref={stlContainerRef}
        sx={{
          width: '100%',
          height: '90vh',
          border: '2px dashed #6c757d',
          backgroundColor: '#e0e0e0',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {showPlaceholder && (
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#6c757d',
              textAlign: 'center',
            }}
          >
            Drag and interact with the STL model here
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StlViewer;
