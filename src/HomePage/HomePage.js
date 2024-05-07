import React from 'react';
import './Home.scss';

function HomePage() {
    return (
        <div className="homepage">

            <div className="hero-section">
                <h1>Manage Your Budget Smartly</h1>
            </div>

            <div className="intro-section">
                <h2>Welcome to P-Budget!</h2>
                <p>Your personal finance assistant. Manage, track, and optimize your expenses for a better financial future.</p>
            </div>

            <div className="contentHome">
                <div className="content-block">
                    <h2>Stay on Track</h2>
                    <p>Track and categorize your expenses to understand where your money goes.</p>
                </div>
                <div className="content-block">
                    <h2>Alerts</h2>
                    <p>Set alerts for budget limits to keep your spending in check.</p>
                </div>
                <div className="content-block">
                    <h2>Results</h2>
                    <p>Visualize your financial progress and meet your goals faster.</p>
                </div>
                {/* Additional Feature Blocks */}
                <div className="content-block">
                    <h2>Insights</h2>
                    <p>Get personalized insights based on your spending habits.</p>
                </div>
                <div className="content-block">
                    <h2>Savings Goals</h2>
                    <p>Set and achieve your savings goals with our intuitive tools.</p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2>What Our Users Say</h2>
                <p>"P-Budget has revolutionized how I handle my finances. A must-have app for everyone!" - Jane Doe</p>
                <p>"The alerts feature keeps me on track with my budget goals. Highly recommend!" - John Smith</p>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
                <h2>Ready to Take Control of Your Finances?</h2>
                <a href="Signup">
                <button>Get started by Signing up here!</button>
                </a>
            </div>

            <footer className="footer">
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#terms">Terms of Service</a>
                <div className="social-media">
                    <a href="#facebook">Facebook</a>
                    <a href="#twitter">Twitter</a>
                    <a href="#instagram">Instagram</a>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;