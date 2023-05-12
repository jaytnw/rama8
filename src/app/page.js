"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";


import Image from 'next/image';
import html2canvas from 'html2canvas';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Grid, Input, Text, Spacer, Button, Modal, Container } from "@nextui-org/react";

import { HexColorPicker } from "react-colorful";
import useClickOutside from "./useClickOutside";
import downloadjs from 'downloadjs';


import { Inter, Kanit, Noto_Sans_Thai } from 'next/font/google'
const kanit = Kanit({ weight: '400', subsets: ['latin'] })
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['latin'] })

const HeartIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function split(str) {
  // https://github.com/nota/split-graphemes/blob/master/src/thai.js
  const letter = '[\\u0E00-\\u0E7F]';
  const trailingLetter = '[\\u0E31\\u0E33-\\u0E3A\\u0E47-\\u0E4E]';
  const thai = `${letter}${trailingLetter}*`;
  const splitter = new RegExp(`(${thai}|.)`, 'gui');

  return str.replace(/ำ/g, 'ํา').replace(/แ/g, 'เเ').match(splitter) || [];
};

export default function Home() {


  const popover = useRef();
  const popoverLight = useRef();
  const imageRef = useRef(null);

  const [text, setText] = useState('ใส่ข้อความ');
  const [color, setColor] = useState("#fff");
  const [colorLight, setColorLight] = useState("#FF0000");
  const [fontSize, setFontSize] = useState(12);
  const [xAxis, setXaxis] = useState(-1);
  const [yAxis, setYaxis] = useState(-75);


  const [isOpen, toggle] = useState(false);
  const [isOpenLight, toggleLight] = useState(false);
  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const closeLight = useCallback(() => toggleLight(false), []);
  useClickOutside(popoverLight, closeLight);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //-------------- it's not work with chrome mobile -----------
  // const handleImageDownload = () => {

  //   html2canvas(imageRef.current).then((canvas) => {
  //     const link = document.createElement('a');
  //     link.download = 'adsRama8.png';
  //     link.href = canvas.toDataURL();
  //     link.click();
  //   });
  // };

  const [visibleDonate, setVisibleDonate] = useState(false);
  const handlerDonate = () => setVisibleDonate(true);

  const closeHandlerDonate = () => {
    setVisibleDonate(false);
    // console.log("closed");
  };


  const handleImageDownload = async () => {
    const canvas = await html2canvas(document.getElementById("image-container"),
      {
        letterRendering: 1,
        allowTaint: false,
        scale: 1,
        dpi: 300,
        backgroundColor: "rgba(0,0,0,0)",
        // onclone: (clonedDoc) => {
        //   // clonedDoc.getElementById("image-container").style.display = "block";
        //   // clonedDoc.getElementById("frontCardLoad").style.display = "block";
        //   // Visibility set to visible using `onclone` method
        // },

      })

    const dataURL = canvas.toDataURL('image/png');

    downloadjs(dataURL, 'adsRama8.png', 'image/png');



  };






  return (
    <Grid.Container gap={2} justify="center" alignItems="center" css={{ display: "flex", flexDirection: "row" }}>


      <Grid lg={6}>
        <Spacer y={1} />
        <Grid.Container justify="center" alignItems="center" >
          <Grid.Container justify="center" alignItems="center">
            <Text size={30} className={kanit.className}>ยิงเลเซอร์สะพานพระราม 8</Text>
          </Grid.Container>
          <Spacer y={1} />
          <Grid.Container>
            <Input
              type="text"
              initialValue={text}
              underlined
              clearable
              onChange={handleTextChange}
              css={{ width: "100%" }}
              labelPlaceholder="ข้อความ"
            />
          </Grid.Container>
          <Spacer y={1} />
          <Grid.Container>
            <Text css={{ mb: 16 }} size={14} className={kanit.className}>ขนาดตัวอักษร</Text>
            <Slider value={fontSize} min={0} max={60} onChange={setFontSize} />
          </Grid.Container>

          <Spacer y={1} />
          <Grid.Container>
            <Text css={{ mb: 16 }} size={14} className={kanit.className}>แกน X</Text>
            <Slider value={xAxis} min={-500} max={500} onChange={setXaxis} />
          </Grid.Container>

          <Spacer y={1} />
          <Grid.Container>
            <Text css={{ mb: 16 }} size={14} className={kanit.className}>แกน Y</Text>
            <Slider value={yAxis} min={-500} max={500} onChange={setYaxis} />
          </Grid.Container>

          <Spacer y={1} />
          <Grid.Container>
            <Grid>
              <Grid.Container >
                <Text css={{ mb: 16, mr: 10 }} size={14} className={kanit.className}>สีข้อความ</Text>
                <div className="picker">
                  <div
                    className="swatch"
                    style={{ backgroundColor: color }}
                    onPress={() => toggle(true)}
                  />

                  {isOpen && (
                    <div className="popover" ref={popover}>
                      <HexColorPicker color={color} onChange={setColor} style={{ zIndex: 2 }} />
                    </div>
                  )}
                </div>
              </Grid.Container>
            </Grid>

            <Spacer y={1} />
            <Grid>
              <Grid.Container>
                <Text css={{ mb: 16, mr: 10 }} size={14} className={kanit.className}>สีไฟนีออน</Text>
                <div className="picker">
                  <div
                    className="swatch"
                    style={{ backgroundColor: colorLight }}
                    onClick={() => toggleLight(true)}
                  />

                  {isOpenLight && (
                    <div className="popover" ref={popoverLight}>
                      <HexColorPicker color={colorLight} onChange={setColorLight} style={{ zIndex: 2 }} />
                    </div>
                  )}
                </div>
              </Grid.Container>
            </Grid>
          </Grid.Container>

          <Grid.Container alignItems="center" justify="center">

            <Button
              auto
              rounded
              ripple={false}
              color="success"
              // size="auto"
              onClick={handleImageDownload}
              css={{
                zIndex: 1,
                background: '$white',
                fontWeight: '$semibold',
                boxShadow: '$md',
                position: 'relative',
                overflow: 'visible',
                color: '#0F9549',
                px: '$18',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: '$white',
                  opacity: 1,
                  borderRadius: '$pill',
                  transition: 'all 0.4s ease'
                },
                '&:hover': {
                  transform: 'translateY(-5px)',
                  '&:after': {
                    transform: 'scaleX(1.5) scaleY(1.6)',
                    opacity: 0
                  }
                },
                '&:active': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Download
            </Button>
          </Grid.Container>

          <Grid.Container justify="center" css={{mt:10}} >

            <Button size="sm" flat bordered onPress={handlerDonate} color="$bgColor" css={{
              color: "$orange",
              backgroundColor: "$white"
            }}>
              <HeartIcon style={{ display: "block" }} fill="red" filled />

              <Text className={noto_sans_thai.className} css={{ pt: 2 }} size={16} color="$blue" >
                สนับสนุน
              </Text>

            </Button>
          </Grid.Container>

        </Grid.Container>



        <Spacer y={.5} />
      </Grid>


      <Grid lg={6} >
        <div ref={imageRef} className="image-container" id="image-container">
          <img src="/rama8-img.png" height="100%" width="100%" />

          <div
            className="overlay neonText"
            style={{
              transform: `translate(${xAxis}px , ${yAxis}px)`,
              textShadow: `0 0 5px ${colorLight}, 0 0 15px ${colorLight}, 0 0 20px ${colorLight}, 0 0 40px ${colorLight}, 0 0 60px ${colorLight}, 0 0 10px ${colorLight}, 0 0 98px ${colorLight}`,
              color: color,
              fontSize: fontSize,
              textAlign: "center",
            }}
          >
            {split(text).map((s, idx) => {
              return <div key={idx}>{s}</div>
            })}
          </div>
        </div>
      </Grid>
      {/* {xAxis}
      |
      {yAxis} */}

      <Modal
        closeButton
        open={visibleDonate}
        onClose={closeHandlerDonate}

      >

        <Modal.Header>
          <Grid.Container className="modalDonate" >

            <Text b h1 size={20} css={{ pt: 8, pr: 10 }} className={noto_sans_thai.className} >
              สนับสนุนค่าเซิฟเวอร์
            </Text>

            <HeartIcon style={{ display: "block" }} fill="red" filled />

          </Grid.Container>

        </Modal.Header>
        <Modal.Body  >
          <Grid.Container className="modalDonate" >

            <Image
              src="/promptpay.png"
              alt="PromptPay"
              width={300}
              height={300}
              style={{ display: "block", margin: "auto" }}
            />

            <Text css={{ mt: 20 }} size={18} className={noto_sans_thai.className} color="#fff"  >
              ใช้แอปธนาคารสแกน QR code ได้เลย!
            </Text>

          </Grid.Container>

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" className={noto_sans_thai.className} onPress={closeHandlerDonate}>
            ปิด
          </Button>
        </Modal.Footer>

      </Modal>

    </Grid.Container>
  )
}

