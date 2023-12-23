import React, { useContext, useState } from "react";
import Layout from "../components/app/Layout";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/FirebaseConfig";
import AppContext from "../context/AppContext";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../components/suspence/Loader";

const ContactForm = () => {
  const context = useContext(AppContext);
  const { loading, setLoading } = context;
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    message: null,
  });

  const handleSubmitForm = async () => {
    const { name, email, message } = formData;

    if (name == null || email == null || message == null) {
      return toast.error("Please fill all fields");
    }

    const contactRef = collection(fireDB, "contactform");
    setLoading(true);

    try {
      await addDoc(contactRef, formData);
      toast.success("Thank you for your response");
      setLoading(false);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        {loading && <Loader />}
        <section
          id="contact"
          class="relative w-full min-h-screen bg-white text-white"
        >
          <h1 class="text-4xl p-4 font-bold tracking-wide">Contact</h1>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 h-32 w-full"></div>

          <div class="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
            <div class="w-full md:w-1/2 p-5 md:px-0 mx-5">
              <div class="bg-gray-900 border border-yellow-500 w-full lg:w-1/2 h-full p-5 pt-8">
                <h3 class="text-xl font-semibold mb-5">Address</h3>

                <div class="flex flex-col gap-3">
                  <p>
                    Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO
                    65584-5678
                  </p>
                  <p>yunioq@yahoo.com</p>
                  <p>8668676858 || 6868586858</p>
                  <p>https://yuniq.com</p>
                </div>
              </div>
            </div>

            <form
              action="#"
              class="w-full md:w-1/2 border border-yellow-500 p-6 bg-gray-900"
            >
              <h2 class="text-2xl pb-3 font-semibold">Send Message</h2>
              <div>
                <div class="flex flex-col mb-3">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-yellow-500 focus:outline-none focus:bg-gray-800 focus:text-yellow-500"
                    autocomplete="off"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div class="flex flex-col mb-3">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-yellow-500 focus:outline-none focus:bg-gray-800 focus:text-yellow-500"
                    autocomplete="off"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div class="flex flex-col mb-3">
                  <label for="message">Message</label>
                  <textarea
                    rows="4"
                    id="message"
                    class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-yellow-500 focus:outline-none focus:bg-gray-800 focus:text-yellow-500"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div class="w-full pt-3">
                <button
                  type="submit"
                  onClick={handleSubmitForm}
                  class="w-full bg-gray-900 border border-yellow-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-yellow-500 hover:text-white text-xl cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactForm;
