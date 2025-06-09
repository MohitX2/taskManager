import React, { useState, useRef, useEffect } from "react";

const withVirtualisation = (Component, itemsWidth) => {
  return function ({ items, ...props }) {
    const [containerWidth, setContainerWidth] = useState();
    const [scrollableWidth, setScrollableWidth] = useState(0);

    const divRef = useRef(null);

    const [indices, setIndices] = useState([0, 3]);
    const visibleList = items.slice(indices[0], indices[1] + 1);
    
  // console.log(visibleList)
    const calcIndice = () => {
      if (!divRef.current) {
        return;
      }
      if (divRef.current) {
        const scrollLeft = divRef.current.scrollLeft;
        const width = divRef.current.clientWidth;
        const newStart = Math.floor(scrollLeft / itemsWidth);
        const endStart = newStart + Math.ceil(width / itemsWidth);
        return setIndices([newStart, endStart]);
      }
    };

    const handleScroll = () => {
      calcIndice();
    };

    const updateWindowWidth = () => {
      if (!divRef.current) {
        return;
      }
      if (divRef.current) {
        setContainerWidth(divRef.current.clientWidth);
        setScrollableWidth(divRef.current.scrollWidth);
      }
    };

    
    useEffect(()=>{
        setContainerWidth(divRef.current.clientWidth);
        setScrollableWidth(divRef.current.scrollWidth);
        calcIndice();
      window.addEventListener("resize", updateWindowWidth);
      
      return () => window.removeEventListener("resize",updateWindowWidth)

    },[])

    useEffect(() => {
      if (!divRef.current) {
        return;
      }
      if (divRef.current) {
        setContainerWidth(divRef.current.clientWidth);
        setScrollableWidth(divRef.current.scrollWidth);
        calcIndice();
      }

    }, [items.length,scrollableWidth,containerWidth]);

    //extra chize
     //console.log(visibleList)

    const bigWindowWidth = itemsWidth * items.length;

    return (
      <div
        className="Container h-full overflow-x-scroll pb-4 px-2"
        onScroll={handleScroll}
        ref={divRef}
      >
        <div
          className="bigWindow  relative h-full"
          style={{ width: `${bigWindowWidth}px` }}
        >
          <Component
            itemsWidth={itemsWidth}
            visibleList={visibleList}
            indices={indices}
            {...props}
          />
        </div>
      </div>
    );
  };
};

export default withVirtualisation;
