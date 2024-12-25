import Image from "next/image";
import React from "react";

const TryMobileApp = () => {
  return (
    <div className="pl-10 mt-8 bg-[#f7f8f9] grid grid-cols-3 gap-7 items-center">
      <div>
        <Image
          src={"/olxMobileApp.webp"}
          width={1300}
          height={1300}
          alt="olxmobileapp"
        />
      </div>
      <div className="flex gap-3 mt-2">
        <div>
          <h2 className="text-3xl font-semibold uppercase">Try the OLX app</h2>
          <p className="text-xl mt-5">
            Buy, sell and find just about anything using the app on your mobile.
          </p>
        </div>
        <div className="w-[2px] h-[150px] bg-[#002F3433] py-5"></div>
      </div>
      <div>
        <div>
          <h4 className="font-bold uppercase text-sm mb-4">
            Get your app today
          </h4>
        </div>
        <div className="flex gap-2">
          <div>
            <Image
              src={"/iconAppStore.svg"}
              width={130}
              height={130}
              alt="appstore"
            />
          </div>
          <div>
            <Image
              src={"/iconGooglePlay.svg"}
              width={130}
              height={130}
              alt="googleplay"
            />
          </div>
          <div>
            <Image
              src={"/iconAppGallery.svg"}
              width={130}
              height={130}
              alt="appgallery"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryMobileApp;
