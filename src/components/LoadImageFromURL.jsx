import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// the first very simple and recommended way:
const LoadImageFromURL = (props) => {
    const [image] = useImage(props.src);
    return <KonvaImage image={image} width={props.containerOffsetWidth} height={props.containerOffsetHeight-100} x={20} y={50} />;
};


export default LoadImageFromURL;