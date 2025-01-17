import { SVGAttributes } from "react";

export function FormElementIcon({ choice }: { choice: string }) {
  const choices = [
    "section",
    "table",
    "shortanswer",
    "longanswer",
    "multiplechoice",
    "checkbox",
    "fileupload",
    "date",
  ];
  const icons = [
    <SectionIcon />,
    <TableIcon />,
    <ShortAnswerIcon />,
    <LongAnswerIcon />,
    <MultipleChoiceIcon />,
    <CheckboxIcon />,
    <FileUploadIcon />,
    <DateIcon />,
  ];

  return (
    <>
      {choices.map((val, index) => {
        if (val === choice) {
          return icons[index];
        }
      })}
    </>
  );
}

export function ShortAnswerIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 10H18"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6 14H12.5"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}

export function LongAnswerIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 6H18"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6 10H12.5"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6 14H18"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M6 18H12.5"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}

export function MultipleChoiceIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33333 8H18M9.33333 12H18M9.33333 16H18M6 8H6.00667M6 12H6.00667M6 16H6.00667"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function CheckboxIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.75 11.25L12 13.5L19.5 6M18.75 12V17.25C18.75 17.6478 18.592 18.0294 18.3107 18.3107C18.0294 18.592 17.6478 18.75 17.25 18.75H6.75C6.35218 18.75 5.97064 18.592 5.68934 18.3107C5.40804 18.0294 5.25 17.6478 5.25 17.25V6.75C5.25 6.35218 5.40804 5.97064 5.68934 5.68934C5.97064 5.40804 6.35218 5.25 6.75 5.25H15"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function FileUploadIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.66667 12V17.3333C6.66667 17.687 6.80714 18.0261 7.05719 18.2761C7.30724 18.5262 7.64638 18.6667 8 18.6667H16C16.3536 18.6667 16.6928 18.5262 16.9428 18.2761C17.1929 18.0261 17.3333 17.687 17.3333 17.3333V12M14.6667 8L12 5.33334M12 5.33334L9.33333 8M12 5.33334V14"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function DateIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.66667 3.66666V6.16666"
        stroke="black"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.3333 3.66666V6.16666"
        stroke="black"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.91667 9.575H19.0833"
        stroke="black"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.5 9.08333V16.1667C19.5 18.6667 18.25 20.3333 15.3333 20.3333H8.66667C5.75 20.3333 4.5 18.6667 4.5 16.1667V9.08333C4.5 6.58333 5.75 4.91666 8.66667 4.91666H15.3333C18.25 4.91666 19.5 6.58333 19.5 9.08333Z"
        stroke="black"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0789 13.4167H15.0864"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0789 15.9167H15.0864"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9962 13.4167H12.0037"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9962 15.9167H12.0037"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.91193 13.4167H8.91941"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.91193 15.9167H8.91941"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function SectionIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 3H4C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H12.5C13.0523 11 13.5 10.5523 13.5 10V4C13.5 3.44772 13.0523 3 12.5 3Z"
        stroke="black"
        stroke-width="2"
      />
      <path
        d="M13 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44771 21 4 21H13C13.5523 21 14 20.5523 14 20V15C14 14.4477 13.5523 14 13 14Z"
        stroke="black"
        stroke-width="2"
      />
      <path
        d="M20 3H18C17.4477 3 17 3.44772 17 4V20C17 20.5523 17.4477 21 18 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z"
        stroke="black"
        stroke-width="2"
      />
    </svg>
  );
}

export function TableIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 3H7C6.44772 3 6 3.44772 6 4V20C6 20.5523 6.44772 21 7 21H17C17.5523 21 18 20.5523 18 20V4C18 3.44772 17.5523 3 17 3Z"
        stroke="black"
        stroke-width="2"
      />
      <path d="M6 9H18" stroke="black" stroke-width="2" />
      <path d="M6 15H18" stroke="black" stroke-width="2" />
      <path d="M12 3V21" stroke="black" stroke-width="2" />
    </svg>
  );
}

export function CheckIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32" // Scales the overall icon to fit the circle
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="15" fill="#28a745" stroke="none" />
      <path
        d="M10 16l4 4 8-8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InformationCircleIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      ></path>
    </svg>
  );
}

export function FormIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path d="M 20.5 3 C 18.203405 3 16.305701 4.7666235 16.050781 7 L 12.5 7 C 10.032499 7 8 9.0324991 8 11.5 L 8 38.5 C 8 40.967501 10.032499 43 12.5 43 L 35.5 43 C 37.967501 43 40 40.967501 40 38.5 L 40 11.5 C 40 9.0324991 37.967501 7 35.5 7 L 31.949219 7 C 31.694299 4.7666235 29.796595 3 27.5 3 L 20.5 3 z M 20.5 6 L 27.5 6 C 28.346499 6 29 6.6535009 29 7.5 C 29 8.3464991 28.346499 9 27.5 9 L 20.5 9 C 19.653501 9 19 8.3464991 19 7.5 C 19 6.6535009 19.653501 6 20.5 6 z M 12.5 10 L 16.769531 10 C 17.581237 11.2019 18.954719 12 20.5 12 L 27.5 12 C 29.045281 12 30.418763 11.2019 31.230469 10 L 35.5 10 C 36.346499 10 37 10.653501 37 11.5 L 37 38.5 C 37 39.346499 36.346499 40 35.5 40 L 12.5 40 C 11.653501 40 11 39.346499 11 38.5 L 11 11.5 C 11 10.653501 11.653501 10 12.5 10 z M 28.601562 17.009766 C 27.473139 17.009766 26.346453 17.434797 25.494141 18.287109 L 16.742188 27.039062 A 1.50015 1.50015 0 0 0 16.34375 27.748047 L 15.041016 33.148438 A 1.50015 1.50015 0 0 0 16.851562 34.958984 L 22.251953 33.654297 A 1.50015 1.50015 0 0 0 22.960938 33.257812 L 31.710938 24.505859 A 1.50015 1.50015 0 0 0 31.712891 24.505859 C 33.416756 22.800488 33.41561 19.991735 31.710938 18.287109 C 30.858625 17.434797 29.729987 17.009766 28.601562 17.009766 z M 28.601562 19.990234 C 28.956139 19.990234 29.311157 20.129516 29.589844 20.408203 C 30.147218 20.965578 30.147978 21.828091 29.589844 22.386719 L 21.138672 30.837891 L 18.535156 31.464844 L 19.162109 28.861328 L 27.615234 20.408203 C 27.893922 20.129516 28.246986 19.990234 28.601562 19.990234 z" />
    </svg>
  );
}

export function CreditCardIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      ></path>
    </svg>
  );
}
