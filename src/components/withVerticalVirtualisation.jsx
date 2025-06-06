import React, { useState, useRef, useEffect } from "react";

const withVerticalVirtualisation = (Component, itemsHeight) => {
  return function ({ items, ...props }) {
    const [containerHeight, setContainerHeight] = useState(0);
    const [scrollableHeight, setScrollableHeight] = useState(0);

    const divRef = useRef(null);

    const [indices, setIndices] = useState([0, 3]);

    const visibleList = items.slice(indices[0], indices[1] + 1);

    const calcIndices = () => {
      if (!divRef.current) return;

      const scrollTop = divRef.current.scrollTop;
      const height = divRef.current.clientHeight;

      const newStart = Math.floor(scrollTop / itemsHeight);
      const newEnd = newStart + Math.ceil(height / itemsHeight);

      setIndices([newStart, newEnd]);
    };

    const handleScroll = () => {
      calcIndices();
    };

    const updateWindowHeight = () => {
      if (!divRef.current) return;

      setContainerHeight(divRef.current.clientHeight);
      setScrollableHeight(divRef.current.scrollHeight);
    };

    useEffect(() => {
      if (!divRef.current) return;

      setContainerHeight(divRef.current.clientHeight);
      setScrollableHeight(divRef.current.scrollHeight);
      calcIndices();

      window.addEventListener("resize", updateWindowHeight);
      return () => window.removeEventListener("resize", updateWindowHeight);
    }, []);

    useEffect(() => {
      updateWindowHeight(); 
      calcIndices();
    }, [items.length]);

    const bigWindowHeight = itemsHeight * items.length;

    return (
      <div
        className="Container h-full overflow-y-auto pb-4 px-2"
        onScroll={handleScroll}
        ref={divRef}
      >
        <div
          className="bigWindow relative w-full"
          style={{ height: `${bigWindowHeight}px` }}
        >
          <Component
            itemsHeight={itemsHeight}
            visibleList={visibleList}
            indices={indices}
            {...props}
          />
        </div>
      </div>
    );
  };
};

export default withVerticalVirtualisation;
