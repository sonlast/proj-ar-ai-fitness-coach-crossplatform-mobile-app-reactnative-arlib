import React from 'react';
import { ViroARScene, ViroText } from '@viro-community/react-viro';

const ARScene = () => {
  return (
    <ViroARScene>
      <ViroText text="Hello World"  position={[0, 0, -1]} scale={[.5, .5, .5]}/>
    </ViroARScene>
  )
}

export default ARScene;