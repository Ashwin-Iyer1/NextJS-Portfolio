import React from 'react';
import Bar from '../components/Bar';

export default function Resume() {
    return (
      <div className="Resume" style={{height: '90vh', width: '100vw'}}>
        <Bar />
        <iframe
          src="./Ashwin_Iyer_CV.pdf"
          style={{ width: '100vw', height: '90vh' }}
          frameBorder="0"
        />
      </div>
    );
  }