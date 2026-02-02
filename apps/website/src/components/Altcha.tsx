import "altcha";

const Altcha: React.FC = () => {
  interface captchaPropsInterface {
    debug?: boolean;
    test?: boolean;
  }

  let captchaProps: captchaPropsInterface = {};
  const captchaDebugProps: captchaPropsInterface = {
    debug: true,
    test: true,
  };

  if (import.meta.env.DEV) captchaProps = captchaDebugProps;

  return (
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
  );
};

export default Altcha;
