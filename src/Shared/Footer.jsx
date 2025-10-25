import React from 'react';
import Logo from './Logo';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Logo />
                        </div>
                        <p className="text-emerald-100 mb-6 leading-relaxed">
                            Empowering businesses with innovative digital solutions since 2010. 
                            We deliver excellence through cutting-edge technology and unparalleled service.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaTwitter size={16} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaLinkedinIn size={16} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaInstagram size={16} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <FaYoutube size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Home</a>
                            </li>
                            <li>
                                <a href="/about" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">About Us</a>
                            </li>
                            <li>
                                <a href="/services" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Services</a>
                            </li>
                            <li>
                                <a href="/projects" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Projects</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Web Development</a>
                            </li>
                            <li>
                                <a href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Mobile Apps</a>
                            </li>
                            <li>
                                <a href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Cloud Solutions</a>
                            </li>
                            <li>
                                <a href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">AI & Automation</a>
                            </li>
                            <li>
                                <a href="#" className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300">Consulting</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-emerald-300 mt-1 flex-shrink-0" />
                                <span className="text-emerald-100">123 Business District, City, State 12345</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhone className="text-emerald-300 flex-shrink-0" />
                                <span className="text-emerald-100">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-emerald-300 flex-shrink-0" />
                                <span className="text-emerald-100">info@company.com</span>
                            </div>
                        </div>
                    </div>
                </div>

              

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-emerald-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-emerald-200">
                                Copyright © {new Date().getFullYear()} - All rights reserved
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a href="/privacy" className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="/cookies" className="text-emerald-200 hover:text-emerald-300 transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;