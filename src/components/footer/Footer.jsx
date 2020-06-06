import React from 'react';

const styles = {
    backgroundColor: '#2E323F',
    height: '30px',
    width: '100%',
    color: 'white',
    position: 'fixed',
    bottom: '0'
};

export function Footer(){
    return (
        <div className="footer" style={styles}>
            Ⓒ Copyright 2020 | Rosen Rekin. All Rights Reserved.
        </div>
    );
}