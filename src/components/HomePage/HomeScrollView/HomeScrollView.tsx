import { ScrollView } from '@progress/kendo-react-scrollview';
import { Link } from "react-router-dom";

export const HomeScrollView = () => {
    return <div>
        <ScrollView style={{
            width: 1920,
            height: 601,
        }}
            arrows={false}
            automaticViewChange={true}
            endless={true}

        >
            <img src={require('../../../images/scrollviewimage.png')} width='1920' height='601' alt='scroll-view' />
            <img src={require('../../../images/scrollviewimage.png')} width='1920' height='601' alt='scroll-view' />
            <img src={require('../../../images/scrollviewimage.png')} width='1920' height='601' alt='scroll-view' />
            <img src={require('../../../images/scrollviewimage.png')} width='1920' height='601' alt='scroll-view' />
            <img src={require('../../../images/scrollviewimage.png')} width='1920' height='601' alt='scroll-view' />
        </ScrollView>
        <style>{`
        .k-scrollview-pageable > .k-button.k-primary, .k-scrollview-nav > .k-link.k-primary {
            background: #4AA675;
          }
      `}</style>
    </div>;
};
