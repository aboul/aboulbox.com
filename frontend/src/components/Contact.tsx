import React from "react";
import "altcha";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader,
  MailCheck,
  MailWarning,
} from "lucide-react";

import { InputErrorMessage } from "./InputErrorMessage";
import CopyButton from "./CopyButton";

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSend, setIsSend] = React.useState(false);
  const [isOnError, setIsOnError] = React.useState(false);
  const [inputErrors, setInputErrors] = React.useState<{
    [key: string]: string;
  }>({});
  const messageDelay = 5000;

  interface captchaPropsInterface {
    debug?: boolean;
    test?: boolean;
  }

  let captchaProps: captchaPropsInterface = {};
  const captchaDebugProps: captchaPropsInterface = {
    debug: true,
    test: true,
  };

  if (process.env.NODE_ENV === "development") captchaProps = captchaDebugProps;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  }

  function handleIsSuccess() {
    setIsSend(true);
    setTimeout(() => {
      setIsSend(false);
    }, messageDelay);
  }

  function handleIsError() {
    setIsOnError(true);
    setIsLoading(false);
    setTimeout(() => {
      setIsOnError(false);
    }, messageDelay);
    umami.track("Contact button error");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    umami.track("Contact button");
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      fetch("api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
        .then((res) => {
          setIsLoading(false);

          if (!res.ok) {
            res.json().then((data) => {
              if (
                Object.prototype.hasOwnProperty.call(data, "validation-error")
              ) {
                data["validation-error"].forEach(
                  (error: { [key: string]: string }) => {
                    setInputErrors((prevErrors) => ({
                      ...prevErrors,
                      [error.path]: error.msg,
                    }));
                  }
                );
              }

              if (Object.prototype.hasOwnProperty.call(data, "error")) {
                handleIsError();
              }
            });
          }

          if (res.ok) {
            handleIsSuccess();
          }
        })
        .catch((error) => {
          handleIsError();
          console.error("Error:", error);
          throw error;
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error));
      }
      handleIsError();
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "abel.brien@gmail.com",
      doCopy: true,
    },
    {
      icon: Phone,
      title: "Phone",
      details: "06 75 23 44 62",
      doCopy: true,
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Toulouse, Occitanie, France",
      doCopy: false,
    },
  ];

  return (
    <section
      id="contact"
      className="mb-12 scroll-mt-16 md:mb-18 lg:mb-24 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Contact
        </h2>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Let's Start a Conversation
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              I'm passionate about collaborating on innovative projects that
              push the boundaries of web development. Whether you have a
              groundbreaking idea or just want to connect, I'd love to hear from
              you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-4 p-4 bg-slate-700/50 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:bg-slate-800/30 transition-all duration-300"
                >
                  <div className="shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{info.title}</h4>
                    <p className="text-gray-400">{info.details}</p>
                  </div>

                  {info.doCopy && (
                    <CopyButton
                      textToCopy={info.details.replace(/\s+/g, "")}
                      iconClassName="w-4 h-4"
                      className="overflow-hidden cursor-pointer opacity-0 group-hover:opacity-100 ml-auto p-2 rounded-full bg-slate-700/40 transition-all 
                    duration-300 hover:scale-120 hover:bg-slate-700/80"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative bg-slate-700/50 rounded-2xl p-8 border border-gray-700">
            <span
              className={`absolute z-10 inset-x-0 inset-y-0 rounded-2xl flex bg-gray-800/90 border border-blue-500/50 transition-all duration-300 text-center ${
                isLoading === true || isSend === true || isOnError === true
                  ? "block"
                  : "hidden"
              }`}
            >
              <span
                className={`flex-col justify-center items-center p-4 m-auto ${
                  isLoading === true ? "flex" : "hidden"
                }`}
              >
                <Loader className="animate-spin-slow w-12 h-12 m-x-auto mb-2" />
                <span className="block text-shadow-md text-shadow-gray-950">
                  Envoi en cours...
                </span>
              </span>

              <span
                className={`flex-col justify-center items-center p-4 m-auto ${
                  isSend === true ? "flex" : "hidden"
                }`}
              >
                <MailCheck className="text-lime-700 w-12 h-12 m-x-auto mb-3" />
                <span className="block text-shadow-md text-shadow-gray-950">
                  Votre message a été envoyé avec succès
                </span>
              </span>
              <span
                className={`flex-col justify-center items-center p-4 m-auto ${
                  isOnError === true ? "flex" : "hidden"
                }`}
              >
                <MailWarning className="text-red-600 w-12 h-12 m-x-auto mb-2" />
                <span className="block text-shadow-md text-shadow-gray-950">
                  Une erreur est survenue, le mail n'est probablement pas parti.
                  <br />
                  Veuillez retenter plus tard.
                </span>
              </span>
            </span>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-teal-950 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${
                      inputErrors.name
                        ? "border border-red-800 rounded-t-lg"
                        : "rounded-lg"
                    }`}
                    placeholder="Your name"
                  />
                  {inputErrors.name && (
                    <InputErrorMessage message={inputErrors.name} />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-teal-950 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${
                      inputErrors.email
                        ? "border border-red-800 rounded-t-lg"
                        : "rounded-lg"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {inputErrors.email && (
                    <InputErrorMessage message={inputErrors.email} />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-teal-950 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${
                    inputErrors.phone
                      ? "border border-red-800 rounded-t-lg"
                      : "rounded-lg"
                  }`}
                  placeholder="Your phone number"
                />
                {inputErrors.phone && (
                  <InputErrorMessage message={inputErrors.phone} />
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-teal-950 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${
                    inputErrors.subject
                      ? "border border-red-800 rounded-t-lg"
                      : "rounded-lg"
                  }`}
                  placeholder="Project discussion"
                />
                {inputErrors.subject && (
                  <InputErrorMessage message={inputErrors.subject} />
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`block w-full px-4 py-3 bg-teal-950 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${
                    inputErrors.message
                      ? "border-red-800 rounded-t-lg"
                      : "rounded-lg"
                  }`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {inputErrors.message && (
                  <InputErrorMessage message={inputErrors.message} />
                )}
              </div>

              <div>
                <altcha-widget
                  id="altcha"
                  style={{
                    "--altcha-color-border": "var(--color-gray-600)",
                    "--altcha-color-base": "var(--color-teal-950)",
                    "--altcha-border-radius": "var(--radius)",
                    "--altcha-color-text": "var(--color-gray-400)",
                  }}
                  hidelogo
                  hidefooter
                  challengeurl="api/altcha"
                  {...captchaProps}
                ></altcha-widget>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-2xl hover:shadow-lime-600/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
