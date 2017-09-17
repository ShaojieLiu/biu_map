/**
 * Created by liushaojie on 2017/9/16.
 */
const __main = () => {
    const canvas = e('#biu-map')
    const bm = new BiuMap(canvas)
    bm.data = {
        title: '中心主题',
        children: [
            {title: '一级主题1',
            children: [
                {title: '二级主题1-1',
                children: [
                    {title: '三级主题1-1-1',
                    children: []
                    },
                    {title: '三级主题1-1-2',
                    children: []
                    },
                    {title: '三级主题1-1-3',
                    children: []
                    }
                ]
                },
                {title: '二级主题1-2',
                children: [
                    {title: '非等长',
                    children: [
                        {title: '',
                        children: []
                        },
                        {title: '',
                        children: []
                        },
                        {title: '',
                        children: []
                        }
                    ]
                    },
                    {title: '三级主题1-2-2',
                    children: []
                    }
                ]
                }
            ]
            },
            {title: '一级主题2',
            children: [
                {title: '二级主题2-1',
                children: []
                },
                {title: '二级主题2-2',
                children: [
                        {title: '三级主题2-2-1',
                        children: []
                        },
                        {title: '三级主题2-2-2',
                        children: []
                        }
                    ]
                },
            ]
            }
        ]
    }
}
__main()