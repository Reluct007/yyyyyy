import NextErrorComponent from "next/error";

export default function Error({ statusCode }) {
  return <NextErrorComponent statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};
