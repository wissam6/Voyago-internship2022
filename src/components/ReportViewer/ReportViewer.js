import React from 'react';
import { TelerikReportViewer } from '@progress/telerik-react-report-viewer'

export function ReportViewer() {

    let viewer;

    return (
        <>
            <TelerikReportViewer
                ref={el => viewer = el}
                serviceUrl="https://localhost:7227/api/reports/"
                //templateUrl="http://localhost:59655/api/reports/resources/templates/telerikReportViewerTemplate.html/"
                reportSource={{
                    report: 'SampleReport.trdp',
                    parameters: {}
                }}
                viewerContainerStyle={{
                    position: 'absolute',
                    left: '5px',
                    right: '5px',
                    top: '40px',
                    bottom: '5px',
                    overflow: 'hidden',
                    clear: 'both',
                    fontFamily: 'ms sans serif'
                }}
                viewMode="INTERACTIVE"
                scaleMode="SPECIFIC"
                scale={1.0}
                enableAccessibility={false} />
            <button id="refresh-button" onClick={() => viewer.refreshReport()}>Refresh</button>
            <button onClick={() => viewer.commands.print.exec()}>Print</button>
        </>
    )
}