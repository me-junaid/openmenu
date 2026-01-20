import { useContext, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ItemsContext } from "../../contexts/ItemsContext";

export default function QRGenerator() {
  const { selectedItems } = useContext(ItemsContext);
  const [text, setText] = useState("orgetise.com");

  // useEffect(() => {
  //   if (selectedItems) {
  //     setText(JSON.stringify(selectedItems));
  //   }
  // }, [selectedItems]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {text && (
        <QRCodeCanvas
          value={text}
          size={300}
          bgColor="#ffffff"
          fgColor="#000000"
          level="L"
        />
      )}
    </div>
  );
}
