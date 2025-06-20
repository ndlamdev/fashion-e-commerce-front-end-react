/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:29 PM - 14/05/2025
 *  User: kimin
 **/
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

function RecentActivity() {
  const { t } = useTranslation(undefined, {
      keyPrefix: "recent_activities"
    });

	return (
		<div className={"flex flex-col items-center gap-8 rounded-2xl bg-[#F1F1F1] p-5 md:flex-row md:p-8 lg:p-10"}>
			<div className={"flex-2/3"}>
				<h3 className={"mb-3 text-xl font-bold md:mb-5 md:text-2xl uppercase"}>{t("title")}</h3>
				<div className={"flex flex-col gap-3 md:flex-row"}>
					<picture className={"w-full"}>
						<source
							media={"(max-width: 768px)"}
							srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip15.png"}
						/>
						<img
							src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip18.png"}
							alt={"image.png"}
							className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
						/>
					</picture>
					<picture className={"w-full"}>
						<source
							media={"(max-width: 768px)"}
							srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip14.png"}
						/>
						<img
							src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip19.png"}
							alt={"image.png"}
							className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
						/>
					</picture>
					<picture className={"w-full"}>
						<source media={"(max-width: 768px)"} srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip3_71.png"} />
						<img
							src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip2_81.png"}
							alt={"image.png"}
							className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
						/>
					</picture>
				</div>
			</div>
			<div className={"rounded-l-8xl rounded-r-8xl hidden h-46 w-2 rounded-t-2xl rounded-b-2xl bg-radial from-gray-400 from-10% to-white md:block"} />
			<div className={"flex w-full flex-1/3 flex-col items-center overflow-hidden"}>
				<h3 className={"mb-3 text-center text-xl font-bold md:mb-5 md:text-2xl uppercase"}>{t("sub_title")}</h3>
				<div className={"flex h-full w-full flex-col items-center justify-between"}>
					<div className={"flex h-full flex-col justify-around py-3"}>
						<motion.p className={"flex gap-3 text-nowrap"} animate={{ x: ["100%", "-100%"] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
							<span>{t("viewed_products")}</span>
							<span>{t("viewed_products")}</span>
							<span>{t("viewed_products")}</span>
						</motion.p>
						<motion.p
							className={"flex gap-3 text-nowrap"}
							animate={{ x: ["100%", "-100%"] }}
							transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}>
							<span>{t("viewed_products")}</span>
							<span>{t("viewed_products")}</span>
							<span>{t("viewed_products")}</span>
							<span>{t("viewed_products")}</span>
						</motion.p>
					</div>
					<a href={"#"} className={"flex flex-row flex-nowrap items-center rounded-full bg-black px-5 py-3 text-white md:flex-col lg:flex-row"}>
						<span className={"text-center text-wrap"}>{t("join_now.text")}</span>
						<ArrowRight />
					</a>
				</div>
			</div>
		</div>
	);
}

export default RecentActivity;
