export const createFallbackArena = (scene) => {
  const floorGeometry = new THREE.BoxGeometry(20, 0.5, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8a6d3b });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.25;
  floor.receiveShadow = true;
  scene.add(floor);

  const wallHeight = 3;
  const wallThickness = 0.5;
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
  
  const northWallGeometry = new THREE.BoxGeometry(20, wallHeight, wallThickness);
  const northWall = new THREE.Mesh(northWallGeometry, wallMaterial);
  northWall.position.set(0, wallHeight / 2, -10);
  northWall.castShadow = true;
  scene.add(northWall);
  
  const southWall = northWall.clone();
  southWall.position.z = 10;
  scene.add(southWall);
  
  const eastWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 20);
  const eastWall = new THREE.Mesh(eastWallGeometry, wallMaterial);
  eastWall.position.set(10, wallHeight / 2, 0);
  eastWall.castShadow = true;
  scene.add(eastWall);
  
  const westWall = eastWall.clone();
  westWall.position.x = -10;
  scene.add(westWall);
  
  const pillarGeometry = new THREE.CylinderGeometry(0.5, 0.5, wallHeight * 1.5, 8);
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
  
  const positions = [
    [-8, 0, -8],
    [8, 0, -8],
    [-8, 0, 8],
    [8, 0, 8]
  ];
  
  positions.forEach(pos => {
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(pos[0], wallHeight * 0.75, pos[2]);
    pillar.castShadow = true;
    scene.add(pillar);
  });
  
  return {
    floor,
    walls: [northWall, southWall, eastWall, westWall]
  };
};
