import React, { FC } from "react";
import Link from "next/link";
import moment from "moment";
import useSWR from "swr";
import { SiWakatime as WakatimeIcon } from "react-icons/si";

import Overview from "./Overview";
import CodingActiveList from "./CodingActiveList";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubheading";

import { fetcher } from "@/services/fetcher";

const CodingActive: FC = () => {
	const { data } = useSWR("/api/read-stats", fetcher);

	const formatLastUpdate = (): string => {
		const lastUpdate = moment(data?.last_update);
		if (lastUpdate.isValid()) {
			return lastUpdate.startOf("hour").fromNow();
		}
		return "";
	};

	return (
		<section className="flex flex-col gap-y-2">
			<SectionHeading
				title="Weekly Statistics"
				icon={<WakatimeIcon className="mr-1" />}
			/>
			<SectionSubHeading>
				<div className="dark:text-neutral-400 md:flex-row md:items-center">
					<span>My </span>
					<Link
						href="https://wakatime.com/@aulianza"
						className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
					>
						WakaTime
					</Link>
					<span> last 7 days stats.</span>
				</div>
				<div className="text-sm text-neutral-600 dark:text-neutral-500">
					Last update: <span>{formatLastUpdate()}</span>
				</div>
			</SectionSubHeading>

			<Overview data={data} />
			<CodingActiveList data={data} />
		</section>
	);
};

export default CodingActive;
