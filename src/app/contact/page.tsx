"use client";

import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import GoogleMapComponent from "@/components/GoogleMap";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "233245402719"; // Your WhatsApp number in international format (without +)
    const message = `Hello, my name is ${form.name}. My email is ${form.email}. Here is my message: ${form.message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank"); // Opens WhatsApp with the message
  };

  return (
    <div className="min-h-screen py-12 px-6 md:px-12 lg:px-32 bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? Contact us below or fill out the form.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <a
              href="https://www.google.com/maps?q=5.6502,-0.1969"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-red-500 transition-colors"
            >
              University of Ghana, Legon
            </a>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <FaPhone className="text-green-500 text-2xl" />
            <a
              href="tel:+233245402719"
              className="hover:text-green-600 transition"
            >
              024 540 2719
            </a>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FaEnvelope className="text-blue-500 text-2xl" />
            <a
              href="mailto:felixic360@gmail.com"
              className="hover:text-blue-600 transition"
            >
              excelsiortech@gmail.com
            </a>
          </div>

          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/felixbest360" target="_blank">
              <FaFacebook className="text-blue-700 text-3xl hover:scale-110 transition" />
            </a>
            <a href="https://x.com/felixbest360" target="_blank">
              <FaXTwitter className="text-black text-3xl hover:scale-110 transition" />
            </a>
            <a href="https://www.instagram.com/felixbest360" target="_blank">
              <FaInstagram className="text-pink-600 text-3xl hover:scale-110 transition" />
            </a>
            <a href="https://wa.me/233245402719" target="_blank">
              <FaWhatsapp className="text-green-500 text-3xl hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 p-3 rounded-lg"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="border border-gray-300 p-3 rounded-lg h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Locate Us on the Map
        </h2>
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default Contact;
