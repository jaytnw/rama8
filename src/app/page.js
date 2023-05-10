"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";


// import Image from 'next/image';
import html2canvas from 'html2canvas';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Grid, Input, Text, Spacer, Button } from "@nextui-org/react";

import { HexColorPicker } from "react-colorful";
import useClickOutside from "./useClickOutside";



import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ weight: '400', subsets: ['latin'] })

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

  const handleImageDownload = () => {

    html2canvas(imageRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'adsRama8.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };







  return (
    <Grid.Container gap={2} justify="center" alignItems="center" css={{ display: "flex", flexDirection: "row" }}>


      <Grid lg={6}>
        <Spacer y={1} />
        {/* <Card css={{ mw: "800px",mh: }}> */}
        <Grid.Container justify="center" alignItems="center" >
          <Grid.Container justify="center" alignItems="center">
            <Text size={30} className={kanit.className}>ยิงเลเซอร์สะพานพระราม 8</Text>
          </Grid.Container>
          <Spacer y={1} />
          <Grid.Container>
            <Input
              type="text"
              value={text}
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
            {/* <Button color="success" auto onPress={handleImageDownload}>
              Download
            </Button> */}

            <Button
              auto
              rounded
              ripple={false}
              color="success"
              // size="auto"
              onClick={handleImageDownload}
              css={{
                zIndex:1,
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

        </Grid.Container>


        {/* </Card> */}
        <Spacer y={.5} />
      </Grid>

      {/* <Grid.Container css={{width:"50%", height:""}}>
        <Image
          id="image-container"
          src="/rama8-img.png"
          fill
          // width={764}
          // height={1019}
          alt="rama8-img"

        />
      </Grid.Container> */}
      <Grid lg={6} >
        <div ref={imageRef} className="image-container" >
          <img src="/rama8-img.png" height={"100%"} />


          <div className="overlay neonText"
            style={{
              transform: `translate(${xAxis}px , ${yAxis}px)`,
              // writingMode: "vertical-rl",
              // textOrientation: "upright",
              // whiteSpace: 'nowrap',
              textShadow: `0 0 5px ${colorLight}, 0 0 15px ${colorLight}, 0 0 20px ${colorLight}, 0 0 40px ${colorLight}, 0 0 60px ${colorLight}, 0 0 10px ${colorLight}, 0 0 98px ${colorLight}`,
              color: color,
              fontSize: fontSize
            }}>
            {text}
          </div>


        </div>
      </Grid>
      {/* {xAxis}
      |
      {yAxis} */}


    </Grid.Container>
  )
}

