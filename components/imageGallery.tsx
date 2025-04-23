import Image from "next/image";

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  return (
    <div className={"boarder-9 flex flex-wrap border-b-fuchsia-600"}>
      {images &&
        images.length > 0 &&
        images.map((image: string, index: number) => (
          <Image
            key={index}
            alt=""
            src={image}
            height={200}
            width={200}
            priority
          />
        ))}
    </div>
  );
}
