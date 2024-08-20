// components/Skeleton.tsx
import React from 'react';

interface SkeletonProps {
  height?: string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = '20%', width = '50%' }) => {
  return (
    <>
     
            <div 
                    style={{
                        display:'inline',
                        height:'30%',
                        width:'50%',
                        marginBottom: '10px',
                        marginRight: '10px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4%',
                        animation: 'pulse 1.5s infinite',
                    }}> </div>
                
                <div 
                        style={{
                            display:'inline',
                            height:'30%',
                            width:'50%',
                            marginBottom: '10px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            animation: 'pulse 1.5s infinite',
                        }}>  </div>
      
    </>
       
 
  
  );
};

export default Skeleton;