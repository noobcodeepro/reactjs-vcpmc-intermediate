const LanguagePicker = () => {
  return (
    <div className="pl-2 pr-1 py-2 left-[1697px] top-[24px] rounded border border-slate-300 justify-start items-center gap-2 inline-flex">
      <div className="text-center text-white text-sm font-normal font-montserrat leading-tight tracking-tight">
        Tiếng Việt
      </div>
      <div className="w-[50px] h-6 relative flex">
        <svg
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_20058_400)">
            <path
              d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
              fill="#D80027"
            />
            <path
              d="M11 5L12.4164 9.20162H17L13.2917 11.7983L14.7082 16L11 13.4032L7.29177 16L8.7082 11.7983L5 9.20162H9.58355L11 5Z"
              fill="#FFDA44"
            />
          </g>
          <defs>
            <clipPath id="clip0_20058_400">
              <rect width={22} height={22} fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 9.1697C16.8126 8.98345 16.5592 8.87891 16.295 8.87891C16.0308 8.87891 15.7774 8.98345 15.59 9.1697L12 12.7097L8.45999 9.1697C8.27263 8.98345 8.01918 8.87891 7.75499 8.87891C7.49081 8.87891 7.23736 8.98345 7.04999 9.1697C6.95627 9.26266 6.88187 9.37326 6.8311 9.49512C6.78033 9.61698 6.7542 9.74769 6.7542 9.8797C6.7542 10.0117 6.78033 10.1424 6.8311 10.2643C6.88187 10.3861 6.95627 10.4967 7.04999 10.5897L11.29 14.8297C11.383 14.9234 11.4936 14.9978 11.6154 15.0486C11.7373 15.0994 11.868 15.1255 12 15.1255C12.132 15.1255 12.2627 15.0994 12.3846 15.0486C12.5064 14.9978 12.617 14.9234 12.71 14.8297L17 10.5897C17.0937 10.4967 17.1681 10.3861 17.2189 10.2643C17.2697 10.1424 17.2958 10.0117 17.2958 9.8797C17.2958 9.74769 17.2697 9.61698 17.2189 9.49512C17.1681 9.37326 17.0937 9.26266 17 9.1697Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguagePicker;
