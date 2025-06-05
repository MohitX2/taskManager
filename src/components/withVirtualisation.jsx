import React, { useRef, useEffect, useState } from "react";

return function (categoryList, props) {
  const withVirtualisation = (Component, itemWidth=300) => {
    const [containerWidth, setContainerWidth] = useState();
    const [scrollableWidth, setScrollableWidth] = useState(0);
    const [indices, setIndices] = useState([0, typeList.length]);
    const divRef = useRef(null);

    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      console.log(scrollLeft);
      const newStartIndex = Math.floor(scrollLeft / itemswidth);
      const newEndIndex = newStartIndex + Math.ceil(containerWidth / itemWidth);

      setIndices([newStartIndex, newEndIndex]);
    };

    useEffect(() => {
      const updateWindowWidth = () => {
        setContainerWidth(divRef.current.clientWidth);
        setScrollableWidth(divRef.current.scrollWidth);
      };

      updateWindowWidth();
      window.addEventListener("resize", updateWindowWidth);
    }, []);

    useEffect(() => {
      if (!divRef.current) {
        return;
      }
      if (divRef.current) {
        setContainerWidth(divRef.current.clientWidth);
        setScrollableWidth(divRef.current.scrollWidth);
      }
    }, [typeList]);
      

    return (

    <div className="w-screen">
    <Component {...props} />
    </div>
  
  )
    
  };
};

export default withVirtualisation;