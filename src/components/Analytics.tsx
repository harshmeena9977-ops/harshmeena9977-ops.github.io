import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
const validGaId = gaId && /^G-[A-Z0-9]+$/.test(gaId) ? gaId : undefined;
const validClarityId = clarityId && /^[A-Za-z0-9-]+$/.test(clarityId) ? clarityId : undefined;

export function Analytics() {
  return (
    <>
      {validGaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${validGaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${validGaId}');`}
          </Script>
        </>
      )}
      {validClarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${validClarityId}");`}
        </Script>
      )}
    </>
  );
}
