const chinese = {
    timezone: 'Asia/Shanghai',
    list: [
        // {
        //     resType: "json",
        //     url: 'https://www.infoq.cn/public/v1/article/getList?id=33&size=30&type=0',
        //     headers: {
        //         Origin: 'https://www.infoq.cn',
        //         Accept: 'application/json, text/plain, */*',
        //     },
        //     method: 'post',
        //     reqParams: {
        //         id: 33,
        //         size: 30,
        //         type: 0,
        //     },
        //     list: 'data',
        //     title: 'article_title',
        //     type: 'infoq',
        //     date: 'publish_time',
        //     href: (data) => {
        //         return `https://www.infoq.cn/article/${ data.uuid }`;
        //     },
        // },
        {
            resType: "json",
            url: 'https://www.zhihu.com/api/v4/columns/musicfe/items',
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
            method: 'get',
            list: 'data',
            title: 'title',
            type: '知乎-专栏-网易云音乐大前端团队',
            date: 'updated',
            dateType: 'secondUnix',
            href: (data) => {
                return data.url;
            },
        },
        {
            resType: "json",
            url: 'https://www.zhihu.com/api/v4/columns/imweb/items',
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
            method: 'get',
            list: 'data',
            title: 'title',
            type: '知乎-专栏-IMWeb前端社区',
            date: 'updated',
            dateType: 'secondUnix',
            href: (data) => {
                return data.url;
            },
        }
    ]
}

const english = {
    timezone: 'UTC',
    list: [
        {
            url: 'https://devblogs.microsoft.com/typescript/',
            selectorList: '#most-recent article',
            selectorTitle: '.entry-title a',
            type: 'Typescript',
            selectorDate: ".entry-post-date",
            href: ($elem) => {
                return $elem.find(".entry-title a").attr("href");
            },
        },
        {
            url: 'https://reactjs.org/blog/all.html',
            selectorList: '.css-a5dudd',
            selectorTitle: '.css-m6cbzp',
            type: 'React',
            selectorDate: '.css-14mg9l4',
            href: ($elem) => {
                return `https://reactjs.org${ $elem.find(".css-m6cbzp").attr("href") }`;
            }
        },
        {
            url: 'https://developers.google.com/web/updates/rss.xml',
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Chrome',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("guid").text();
            }
        },
        {
            url: 'https://v8.dev/blog',
            selectorList: '#main li',
            selectorTitle: 'a',
            type: 'v8.dev',
            selectorDate: 'time',
            href: ($elem) => {
                return `https://v8.dev${ $elem.find("a").attr("href") }`;
            }
        }
    ],
};

module.exports = {
    english,
    chinese,
}
