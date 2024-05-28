import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">¿Tienes problemas con la plataforma?</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label> Remitente </label>
            <input
              type="text"
              name="subject"
              placeholder="Remitente"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Mensaje</label>
            <textarea
              name="message"
              required
              cols="30"
              rows="10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary">Enviar Mensaje</button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Nuestra Información de Contacto</h3>
            <p>Complete el formulario o contáctenos a través de otros canales que se enumeran a continuación</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>555-555-0000</p>
              </span>
              <span>
                <FaEnvelope />
                <p>support@aaa.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Por aquí, Pacasito</p>
              </span>
              <span>
                <FaTwitter />
                <p>@yonimiro</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
