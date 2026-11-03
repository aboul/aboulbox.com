import "altcha";
import type {} from "altcha/types/react";

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
      id='altcha'
      theme='cyberpunk'
      configuration={JSON.stringify({
        type: "switch",
        hideLogo: true,
        hideFooter: true,
        ...captchaProps,
      })}
      challenge='api/altcha'
    ></altcha-widget>
  );
};

export default Altcha;
