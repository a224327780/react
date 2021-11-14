import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {bytesToSize, checkOnline, getProgressColor, progress} from "../utils/util";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

const Items = () => {
    const [items, setLists] = useState([]);
    // const [timer, setTimer] = useState([]);

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    useEffect(() => {
        const getLists = async () => {
            const resp = await fetch(
                "https://api01-a224327780.cloud.okteto.net/agent"
            );
            const postsResp = await resp.json();
            setLists(postsResp['data']);
        };
        getLists();
    })
    return (
        <div className="grid grid-cols-3 gap-6">
            {items.map((item) => (

                <div key={item._id} className="bg-gray-100 p-6 rounded-lg">
                    <Link to={`/${item._id}`}>
                        <div className="flex mb-2 ">
                            <div className="flex flex-auto items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${checkOnline(item.update_time) ? 'text-green-500' : 'text-red-500'}` }
                                     viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                {timeAgo.format(new Date(item.update_time))}
                            </div>
                        </div>

                        <div className="my-3">
                            <h5 className="flex text-gray-900 font-bold text-2xl tracking-tight mb-2 ">{item.name}</h5>
                        </div>

                        <div className="flex text-gray-500 text-sm mb-6">
                            <div className="flex flex-auto items-center ">{item.ipv4}</div>
                            <div className="flex items-center space-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                {bytesToSize(item.tx_gap)}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                {bytesToSize(item.rx_gap)}
                            </div>

                        </div>

                        <div className="mt-2 flex space-x-4">
                            <div className="text-gray-500 flex items-center">Load</div>
                            <div className="flex-auto flex items-center ">
                                <div className="w-full rounded bg-gray-200 h-4">
                                    <div style={{width: `${progress(item.load_cpu, 10)}%`}}
                                         className={getProgressColor(item.load_cpu, 10)}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 flex space-x-4">
                            <div className="text-gray-500 flex items-center">RAM</div>
                            <div className="flex-auto flex items-center ">
                                <div className="w-full rounded bg-gray-200 h-4">
                                    <div style={{width: `${progress(item.ram_usage, item.ram_total)}%`}}
                                         className={getProgressColor(item.ram_usage, item.ram_total)}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex space-x-4">
                            <div className="text-gray-500 flex items-center">Disk</div>
                            <div className="flex-auto flex items-center">
                                <div className="w-full rounded bg-gray-200 h-4">
                                    <div style={{width: `${progress(item.disk_usage, item.disk_total)}%`}}
                                         className={getProgressColor(item.disk_usage, item.disk_total)}></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Items;
