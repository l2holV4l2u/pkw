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
