import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSuccessMessage('Submission failed, please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred, please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      {/* Hero Section */}
      <div className="bg-blue-600 w-full text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Empower Your Business with Our SaaS Solutions</h1>
        <p className="mt-4 text-xl">Innovative tools to propel your business forward.</p>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white p-8 shadow-md rounded-lg mt-10 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 mb-4 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 mb-4 rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border p-2 mb-4 rounded"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default App;