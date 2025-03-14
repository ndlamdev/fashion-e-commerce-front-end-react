/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:20PM - 08/03/2025
 * User: lam-nguyen
 **/
import { useEffect, useState } from "react";

function useScrolled() {
	const [scrollHeight, setScrollHeight] = useState(0);
	const [scrollWidth, setScrollWidth] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			setScrollWidth(window.scrollX);
			setScrollHeight(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return [scrollWidth, scrollHeight];
}

export default useScrolled;
