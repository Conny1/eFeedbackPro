// pages/documentation.tsx

import Link from "next/link";
import React from "react";

const DocumentationPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4  max-w-5xl ">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between mb-8">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-lg font-bold">eFeedback Pro</span>
        </div>

        {/* Back Link */}
        <Link
          className=" outline outline-2 outline-blue-600 text-center rounded min-w-20 text-blue-600 hover:bg-blue-400 hover:text-white "
          href="/"
        >
          Back
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-4">
        Widget Integration Documentation
      </h1>
      <p className="mb-8">
        This documentation provides guidelines on how to integrate a widget for
        collecting feedback into various frameworks.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">HTML</h2>
        <p className="mb-4">
          If you&apos; re not using any framework, you can include the script
          tag directly in your HTML file:
        </p>
        <pre className="bg-gray-800 p-4 rounded text-gray-300  overflow-x-scroll ">
          <code>
            {`<script src="https://www.expampl.com/sdk/js?client-id=YOUR_CLIENT_ID" id="scripttagid"></script>
<!-- Add this id, it's crucial for the code to work -->`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">React.js</h2>
        <p className="mb-4">
          To integrate the script tag into a React.js application, you can use
          the useEffect hook to dynamically add the script tag to the DOM:
        </p>
        <pre className="bg-gray-800 p-4 rounded text-gray-300  overflow-x-scroll ">
          <code>
            {`import React, { useEffect } from 'react';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.expampl.com/sdk/js?client-id=YOUR_CLIENT_ID';
    script.async = true;
    script.id = 'scripttagid'; // <!-- Add this id, it's crucial for the code to work -->
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>My React Component</div>;
};`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Next.js</h2>
        <p className="mb-4">
          In Next.js, you can use the same approach as in React.js:
        </p>
        <pre className="bg-gray-800 p-4 rounded text-gray-300  overflow-x-scroll ">
          <code>
            {`import React, { useEffect } from 'react';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.expampl.com/sdk/js?client-id=YOUR_CLIENT_ID';
    script.async = true;
    script.id = 'scripttagid'; // <!-- Add this id, it's crucial for the code to work -->
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>My Next.js Component</div>;
};`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Angular.js</h2>
        <p className="mb-4">
          In Angular.js, you can achieve this by using ElementRef to directly
          manipulate the DOM:
        </p>
        <pre className="bg-gray-800 p-4 rounded text-gray-300  overflow-x-scroll ">
          <code>
            {`import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: '<div>My Angular.js Component</div>'
})
export class MyComponent implements OnInit, OnDestroy {
  private scriptElement: HTMLScriptElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = 'https://www.expampl.com/sdk/js?client-id=YOUR_CLIENT_ID';
    this.scriptElement.async = true;
    this.scriptElement.id = 'scripttagid'; // <!-- Add this id, it's crucial for the code to work -->
    this.elementRef.nativeElement.appendChild(this.scriptElement);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeChild(this.scriptElement);
  }
}`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default DocumentationPage;
