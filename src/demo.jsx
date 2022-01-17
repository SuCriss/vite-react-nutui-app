import {useState,useEffect} from 'react'
import { Infiniteloading,Button,Dialog } from '@nutui/nutui-react'
import './demo.css';
import {get} from './api/request'
function Demo() {
    const [refreshList, setRefreshList] = useState([])
    const [refreshHasMore, setRefreshHasMore] = useState(true)

    useEffect(() => {
        get('/search',{keywords:'海阔天空'}).then(res=>{
            console.log('sdsddd',res)
        })
        init()
    }, [])

    const refresh = (done)=>{
      setTimeout(()=>{
          done()
      },500)
    }

    const refreshLoadMore = (done) => {
        setTimeout(() => {
          const curLen = refreshList.length
          for (let i = curLen; i < curLen + 10; i++) {
            refreshList.push(`${i}`)
          }
          if (refreshList.length >= 30) {
            setRefreshHasMore(false)
          } else {
            setRefreshList([...refreshList])
          }
          done()
        }, 500)
      }
      
      const init = () => {
        for (let i = 0; i < 10; i++) {
          refreshList.push(`${i}`)
        }
        setRefreshList([...refreshList])
      }
    return (
        <div className="nutui-demo">
            <ul className="infiniteUl" id="refreshScroll">
                <Infiniteloading
                pullIcon="JD"
                containerId="refreshScroll"
                useWindow={false}
                isOpenRefresh={true} 
                hasMore={refreshHasMore}
                loadMore={refreshLoadMore}
                refresh={refresh}
                >
                    {refreshList.map((item, index) => {
                        return (
                            <li className="infiniteLi" key={index}>
                                {item}
                            </li>
                        )
                    })}
                </Infiniteloading>
            </ul>
            <Button type="primary" onClick={()=>{
                  Dialog.alert({
                    title: '基础弹框',
                    content: '支持函数调用和组件调用两种方式。'
                });
            }}>主要按钮</Button>
        </div>
    )
}
export default Demo