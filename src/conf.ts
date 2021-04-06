const chinese = {
    timezone: 'Asia/Shanghai',
     list: [
        {
            resType: "json",
            url: 'https://www.infoq.cn/public/v1/article/getList?id=33&size=30&type=0',
            headers: {
                Origin: 'https://www.infoq.cn',
                Accept: 'application/json, text/plain, */*',
            },
            method: 'post',
            reqParams: {
                id: 33,
                size: 30,
                type: 0,
            },
            list: 'data',
            title: 'article_title',
            type: 'infoq',
            date: 'publish_time',
            href: (data) => {
                return `https://www.infoq.cn/article/${ data.uuid }`;
            },
        },
        {
            url: 'https://aotu.io/atom.xml',
            selectorList: 'entry',
            selectorTitle: 'title',
            type: '凹凸实验室',
            selectorDate: 'published',
            href: ($elem) => {
                return $elem.find("id").text();
            }
        },
        {
            url: 'https://www.zhangxinxu.com/wordpress/feed/',
            selectorList: 'item',
            selectorTitle: 'title',
            type: '张鑫旭',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("comments").text().replace(/#comments/, '');
            }
        },
        {
            url: 'https://fed.taobao.org/atom.xml',
            selectorList: 'item',
            selectorTitle: ($elem) => {
                return $elem.find("title").html().replace('<!--[CDATA[', '').replace(']]-->', '');
            },
            type: 'Taobao FED | 淘系前端团队',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("id").text();
            }
        },
        {
            template: 'zhihu',
            url: 'https://www.zhihu.com/api/v4/columns/musicfe/items',
            type: '知乎-网易云音乐大前端团队',
        },
        {
            template: 'zhihu',
            url: 'https://www.zhihu.com/api/v4/columns/imweb/items',
            type: '知乎-IMWeb前端社区',
        },
        {
            template: 'zhihu',
            url: 'https://www.zhihu.com/api/v4/columns/FrontendPerusal/items',
            type: '知乎-前端精读评论',
        },
        {
            template: 'zhihu',
            url: 'https://www.zhihu.com/api/v4/columns/tmallf2e/items',
            type: '知乎-淘系前端团队',
        },
        {
            template: 'zhihu',
            url: 'https://www.zhihu.com/api/v4/columns/ElemeFE/items',
            type: '知乎-饿了么前端',
        },
        {
            template: 'juejin',
            reqParams: {
                user_id: '764915822116382',
            },
            type: '掘金-腾讯IMWeb团队',
        },
        {
            template: 'juejin',
            reqParams: {
                user_id: '3456520257288974',
            },
            type: '掘金-政采云前端团队',
        },
        {
            template: 'juejin',
            reqParams: {
                user_id: '395479919373991'
            },
            type: '掘金-阿里巴巴淘系技术',
        },
        {
            template: 'juejin',
            reqParams: {
                user_id: '1257497031878408',
            },
            type: '掘金-闲鱼技术',
        },
        {
            template: 'juejin',
            reqParams: {
                user_id: '4089838988440024',
            },
            type: '掘金-微医大前端技术',
        },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '4098589725834317',
             },
             type: '掘金-字节前端',
         },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '4125023359214382',
             },
             type: '掘金-智联大前端',
         },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '3051900006845944',
             },
             type: '掘金-飞猪前端',
         },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '676954895831517',
             },
             type: '掘金-钉钉前端',
         },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '1292681405013320',
             },
             type: '掘金-晓前端团队',
         },
         {
             template: 'juejin',
             reqParams: {
                 user_id: '1838039172387262',
             },
             type: '掘金-字节跳动技术团队',
         },
         {
            template: 'juejin',
            reqParams: {
                user_id: '2330620350437678',
            },
            type: '掘金-iCSS前端趣闻',
        },
        {
            url: 'https://weekly.75.team/',
            selectorList: '.issue-list li',
            selectorTitle: 'a',
            type: '奇舞周刊',
            selectorDate: 'time',
            href: ($elem) => {
                return `https://weekly.75.team${ $elem.find("a").attr('href') }`;
            }
        },
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
            isHttp2: true,
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
        },
        {
            url: 'https://cprss.s3.amazonaws.com/react.statuscode.com.xml',
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'React Status',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("guid").text();
            }
        },
        {
            url: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml',
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Javascript Weekly',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("guid").text();
            }
        },
        {
            url: 'https://css-tricks.com/feed/',
            isResXml: true,
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'css-tricks',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("link").text();
            }
        },
        {
            url: 'https://overreacted.io/rss.xml',
            isResXml: true,
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Dan Abramov (React作者)',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("link").text();
            }
        },
        {
            url: 'https://addyosmani.com/rss.xml',
            isResXml: true,
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Addy Osmani(Chrome工程管理者)',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("link").text();
            }
        },
        {
            url: 'https://christianheilmann.com/feed/',
            isResXml: true,
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Christian Heilmann',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("link").text();
            }
        },
        {
            url: 'https://cprss.s3.amazonaws.com/frontendfoc.us.xml',
            isResXml: true,
            selectorList: 'item',
            selectorTitle: 'title',
            type: 'Frontend Focus',
            selectorDate: 'pubDate',
            href: ($elem) => {
                return $elem.find("link").text();
            }
        },
    ],
};

const template = {
    juejin (conf) {
        return {
            resType: "json",
            url: 'https://api.juejin.cn/content_api/v1/article/query_list',
            headers: {
                'content-type': 'application/json',
            },
            reqParams: {
                cursor: "0",
                sort_type: 2,
                user_id: conf.reqParams.user_id,
            },
            method: 'post',
            list: 'data',
            title: (data) => {
                return data.article_info.title;
            },
            type: conf.type,
            date: (data) => {
                return data.article_info.mtime;
            },
            dateType: 'secondUnix',
            href: (data) => {
                return 'https://juejin.cn/post/' + data.article_id;
            },
        };
    },
    zhihu (conf) {
        return {
            resType: "json",
            url: conf.url,
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
            method: 'get',
            list: 'data',
            title: 'title',
            type: conf.type,
            date: 'updated',
            dateType: 'secondUnix',
            href: (data) => {
                return data.url;
            },
        }
    },
};

module.exports = {
    english,
    chinese,
    template,
}
