import { useState, useEffect } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  // Load user info from localStorage on mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setForm((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("_captcha", "false");

    try {
      const res = await fetch("https://formsubmit.co/khushal.sharma130771@marwadiuniversity.ac.in", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSent(true);
        setForm({ ...form, message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Contact Us</h2>

              {sent && (
                <div className="alert alert-success text-center" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control border rounded"
                    id="name"
                    name="name"
                    value={form.name}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control border rounded"
                    id="email"
                    name="email"
                    value={form.email}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className="form-control border rounded"
                    id="message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-send me-2"></i>Send Message
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
