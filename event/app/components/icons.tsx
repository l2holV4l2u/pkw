import { SVGAttributes } from "react";

export function Curve(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="18"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" stroke-width="2" />
    </svg>
  );
}

export function CurveWithLine(props?: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="18"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" stroke-width="2" />
      <path d="M9 0V42" stroke="gray" stroke-width="2" />
    </svg>
  );
}
