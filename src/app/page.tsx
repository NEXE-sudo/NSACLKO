"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/components/ui/button";
import EffectsInitializer from "./components/EffectsInitializer";
import Particles from "./components/Particles";
import React, { useState } from "react";

import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";


export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js application!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EffectsInitializer />

      {/* Global Particles background, not in video section */}
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={600}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={90}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <section className="hero-video-section fade-section" id="home" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-video-background">
          <div className="hero-video-container">
            <video autoPlay muted loop playsInline>
              <source src="your-earth-video.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
                width: "100%",
                height: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="hero-video-overlay" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 2 }}>
          <StarsBackground pointerEvents={false} className="absolute inset-0 w-full h-full z-0" />
        </div>

        {/* No Particles in video section */}

        <div className="floating-elements">
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
        </div>

        <div className="hero-content-wrapper stagger-container">
          <div className="hero-subtitle stagger-item">
            Global Innovation Challenge
          </div>
          {/* This will only fade in, not type */}
          <h1 className="hero-main-title fade-in">
            Building Solutions
            <br />
            for Space
          </h1>
          {/* This will trigger typing effect when it comes into view */}
          <p className="hero-description typing-content" data-typing-speed="80">
            Join the NASA Space Apps Challenge 2025 in Lucknow - the world's
            largest global hackathon. Use NASA's open data to develop innovative
            solutions for challenges we face on Earth and in space.
          </p>
          <div className="hero-cta-buttons stagger-item">
            <Button asChild className="hero-btn primary">
              <Link href="/register">Register Now</Link>
            </Button>

            <Button asChild className="hero-btn primary">
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="scroll-indicator fade-in flex flex-col items-center justify-center">
          <div className="scroll-arrow"></div>
          <div className="scroll-text">Scroll Down</div>
        </div>

        {/* Smooth bottom gradient overlay for video section */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '120px',
            zIndex: 3,
            pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%)',
          }}
        ></div>
      </section>

      <section id="home" className="hero fade-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content fade-in">
          <h1 className="main-heading fade-in">Building Solutions for Space</h1>
          {/* Typing effect triggered on scroll */}
          <p className="typing-content" data-typing-speed="80">
            Join the NASA Space Apps Challenge 2025 in Lucknow - the world's
            largest global hackathon. Use NASA's open data to develop innovative
            solutions for challenges we face on Earth and in space. Connect with
            brilliant minds, create groundbreaking technologies, and contribute
            to humanity's greatest endeavors.
          </p>
          <Button asChild className="hero-btn primary fade-in">
            <Link href="#about">Learn More</Link>
          </Button>
        </div>
        {/* Removed placeholder image, retain spacing */}
        <div style={{ height: '120px', width: '100%' }}></div>
      </section>

      <section id="about" className="section fade-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-content stagger-container">
          <h3 className="stagger-item">Global Innovation Challenge</h3>
          <h2 className="main-heading stagger-item">Hack The Universe</h2>
          {/* Typing effect triggered when section comes into view */}
          <p className="typing-content" data-typing-speed="70">
            NASA Space Apps Challenge is an international hackathon where teams
            of technologists, scientists, designers, artists, educators,
            entrepreneurs, and students across the globe collaborate and engage
            with publicly available data to design innovative solutions for
            challenges we face on Earth and in space.
            <br />
            Over the course of one weekend, participants around the world come
            together to work on challenges designed by NASA. The event is free
            to attend, and all backgrounds and skill levels are encouraged to
            participate.
          </p>
          <Button asChild className="hero-btn primary stagger-item">
            <Link href="#about">Learn More</Link>
          </Button>
        </div>
        {/* Removed placeholder image, retain spacing */}
        <div style={{ height: '120px', width: '100%' }}></div>
      </section>

      <section
        id="challenges"
        className="section reverse challenges-section fade-section"
        style={{ position: 'relative', zIndex: 1, background: 'transparent' }}
      >
        <div className="section-content stagger-container">
          <h3 className="stagger-item">Innovation Categories</h3>
          <h2 className="main-heading stagger-item">Challenge Areas</h2>
          {/* Another typing effect triggered on scroll */}
          <p className="typing-content" data-typing-speed="75">
            This year's challenges span multiple disciplines and focus areas,
            from Earth observation and climate science to space exploration and
            astrophysics. Participants can choose from challenges that range
            from beginner-friendly to expert-level, ensuring everyone can
            contribute meaningfully.
            <br />
            Each challenge provides access to relevant NASA datasets, expert
            mentorship, and the tools needed to create impactful solutions.
            Whether you're interested in developing mobile apps, creating data
            visualizations, or building hardware prototypes, there's a challenge
            for you.
          </p>
          <Button asChild className="hero-btn primary stagger-item">
            <Link href="/timeline">Event Schedule</Link>
          </Button>
        </div>
        {/* Removed placeholder image, retain spacing */}
        <div style={{ height: '120px', width: '100%' }}></div>
      </section>
    </div>
  );
}