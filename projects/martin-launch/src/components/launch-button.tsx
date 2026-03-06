"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

type LaunchButtonProps = {
  title: string;
  url: string;
};

export function LaunchButton({ title, url }: LaunchButtonProps) {
  const handleClick = () => {
    window.dataLayer?.push({
      event: "agent_launch",
      agent_name: "Martin",
      destination: url,
      link_text: title,
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "agent_launch", {
        agent_name: "Martin",
        destination: url,
        link_text: title,
      });
    }

    window.dispatchEvent(
      new CustomEvent("martin:launch-click", {
        detail: {
          event: "agent_launch",
          destination: url,
          link_text: title,
        },
      }),
    );
  };

  return (
    <a
      className="launch-button"
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      aria-label={`${title} (opens in a new tab)`}
    >
      <span>{title}</span>
      <span className="launch-button-icon" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
