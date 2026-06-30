import { StrictMode, useState } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'

import './index.css'

function EnquiryForm() {
  // Initial form state with empty values
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }

  // State variables
  const [form, setForm] = useState(initialForm)          // Current form data
  const [entries, setEntries] = useState([])              // List of all enquiries
  const [editIndex, setEditIndex] = useState(-1)          // Index of enquiry being edited
  const [submitted, setSubmitted] = useState(false)        // Show success message
  const [error, setError] = useState(null)                 // Show error message
  const [loading, setLoading] = useState(false)            // Loading state during submit

  // Send enquiry to server
  const saveEnquiry = (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    
    // Create form data object
    const formData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message
    }

    // Send POST request to server
    axios.post('http://localhost:8000/api/website/enquiry', formData)
      .then((response) => {
        console.log(response.data)
        // Add response data to entries list
        setEntries((prev) => [...prev, response.data.data || formData])
        setSubmitted(true)
        setForm(initialForm)
        setLoading(false)
        // Hide success message after 4 seconds
        setTimeout(() => setSubmitted(false), 4000)
      })
      .catch((error) => {
        console.error(error.response?.data || error.message || error)
        // Show error message
        const errorMsg = error.response?.data?.message || 'Failed to submit enquiry. Please try again.'
        setError(errorMsg)
        setSubmitted(false)
        setLoading(false)
        // Hide error message after 5 seconds
        setTimeout(() => setError(null), 5000)
      })
  }
  

  // Update form when user types
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSubmitted(false)
    setError(null)
  }

  // Handle form submission
  const handleSubmit = (event) => {
    if (editIndex >= 0) {
      // If editing, update the entry
      event.preventDefault()
      const updatedEntries = entries.map((entry, index) =>
        index === editIndex ? { ...form } : entry
      )
      setEntries(updatedEntries)
      setEditIndex(-1)
      setSubmitted(true)
      setForm(initialForm)
      // Hide success message after 3.5 seconds
      setTimeout(() => setSubmitted(false), 3500)
    } else {
      // If new entry, send to server
      saveEnquiry(event)
    }
  }

  // Load enquiry data into form for editing
  const handleEdit = (index) => {
    setForm(entries[index])
    setEditIndex(index)
    setSubmitted(false)
  }

  // Delete an enquiry from the list
  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index))
    if (editIndex === index) {
      setForm(initialForm)
      setEditIndex(-1)
    }
  }

  return (
    <div className="page">
      <div className="content-row">
        <div className="form-card">
          <div className="form-title">
            <h1>Enquiry Form</h1>
            <p>Enter your details below and send your message.</p>
          </div>

          <form className="form-section" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-row">
              <div>
                <h1>👤 Name</h1>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-row">
              <div>
                <h1>📧 Email</h1>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="form-row">
              <div>
                <h1>📱 Phone</h1>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="123-456-7890"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="form-row">
              <div>
                <h1>✉️ Message</h1>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="form-textarea"
                  placeholder="Write your enquiry here..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-row">
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <span>⌛ Submitting...</span>
                ) : editIndex >= 0 ? (
                  <span>✏️ Update Enquiry</span>
                ) : (
                  <span>📤 Send Enquiry</span>
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="success-message">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>✨</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>
                    {editIndex >= 0
                      ? 'Enquiry Updated Successfully! 🎉'
                      : 'Enquiry Submitted Successfully! 🎉'}
                  </strong>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.95 }}>
                    {editIndex >= 0
                      ? 'Your enquiry has been updated and saved to our system.'
                      : 'Thank you for reaching out! We will review your enquiry and get back to you soon.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>❌</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>
                    Oops! Something went wrong
                  </strong>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.95 }}>
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="table-card">
          <div className="table-title">
            <h1>Enquiry Table</h1>
            <p>Review all enquiries and edit or delete entries.</p>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No enquiries added yet
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={index}>
                    <td><strong>#{index + 1}</strong></td>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>
                    <td>{entry.message.substring(0, 50)}{entry.message.length > 50 ? '...' : ''}</td>
                    <td>
                      <button
                        type="button"
                        className="action-button"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EnquiryForm />
  </StrictMode>,
)
