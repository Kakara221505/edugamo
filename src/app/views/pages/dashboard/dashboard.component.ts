import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { style } from '@angular/animations';
import {ApexAxisChartSeries,ApexChart,ChartComponent,ApexDataLabels,
  ApexPlotOptions,ApexYAxis,ApexLegend,ApexStroke,ApexXAxis,
  ApexFill,ApexTooltip } from "ng-apexcharts";
import { NgbDateStruct, NgbCalendar, NgbModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

// Ng2-charts
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

// Progressbar.js
import ProgressBar from 'progressbar.js';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ClipboardService } from 'ngx-clipboard';

export type apexChartOptions = {
  series: ApexAxisChartSeries;
 
  colors: string[];
  
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
 
  stroke: ApexStroke,
  legend: ApexLegend,
  
  tooltip: ApexTooltip,
  fill: ApexFill
  dataLabels: ApexDataLabels,
  plotOptions: ApexPlotOptions,
  labels: string[],
 
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true
})
export class DashboardComponent implements OnInit {
  environment = environment
  public lineChartOptions: any = {};
  public barChartOptions: any = {};
  public areaChartOptions: any = {};
  public mixedChartOptions: any = {};
  
  public pieChartOptions: any = {};
  public heatMapChartOptions: any = {};
  public radarChartOptions: any = {};
  public scatterChartOptions: any = {};
  public radialBarChartOptions: any = {};

  public donutChart : Partial<any>
  public userChart : Partial<any>
  public gamesCreatedChart : Partial<any>
  public gamesPlayedChart : Partial<any>
  public userSubscrivedChart : Partial<any>
  classVariable = 0
  type = "daily"
  userData:any;
  top10SubjectGraphData:string[]= [] 
  top10SubjectValue :number[]= [] 
  userdataDate : number[]=[]
  userEliteData : number[]=[]
  userFreeData : number[]=[]
  userPrimiumData : number[]=[] 
  gamesCreatedDate : number[]=[]
  gamesCreatedFree : number[]=[]
  gamesCreatedPremium: number[]=[]
  gamesCreatedElite: number[]=[]
  gamesPlayedDate : number[]=[]
  gamesPlayedFree : number[]=[]
  gamesPlayedPremium : number[]=[]
  gamesPlayedElite : number[]=[]
  userSubscrivedData :number[]=[]
  formattedNumbers :string[]=[]
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#000",
    cardBg         : "#fff",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }
  data: any;
  top3GamesData: any;
  subscribe: string[];
  copyGameUrl: boolean[] = [];

  constructor(private modalService: NgbModal, public formatter: NgbDateParserFormatter,
     private calendar: NgbCalendar, private toastr: ToastrService,
     private api: UserService, private router: Router, private spinner: NgxSpinnerService,
     private clipboardService: ClipboardService) {}

  ngOnInit(): void {
    // this.areaChartOptions = getAreaChartOptions(this.obj);
  
    this.getDonutChartOptions(this.obj);
    this.pieChartOptions = this.getPieChartOptions(this.obj);
    this.dailyData();
   
    if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {
      this.addRtlOptions();
    }
    this.copyGameUrl = new Array(this.top3GamesData.length).fill(false);

  }

  copyUrl(url: string, index: number) {
    // Use ngx-clipboard library to copy the URL to the clipboard
    this.clipboardService.copyFromContent(url);
    // Set the copied status for the specific index
    console.log("hii",index)
    this.copyGameUrl[index] = true;
   
    // Reset the copied status after a certain duration (e.g., 2 seconds)
    setTimeout(() => {
        this.copyGameUrl[index] = false;
    }, 2000);
}

  addRtlOptions() {
   // Area chart
   this.areaChartOptions.yaxis.labels.offsetX = -10;
   this.areaChartOptions.yaxis.title.offsetX = -20;
   
  }

  // my function 
weeklyData(){
  this.spinner.show()
  this.classVariable = 1
  this.type = "weekly"
  this.top10SubjectGraphData = [];
  this. top10SubjectValue = []
this.userEliteData = [];
this.userPrimiumData = [];
this.userFreeData = [];
this.userdataDate = [];
this.gamesCreatedDate = [];
this.gamesCreatedElite = [];
this.gamesCreatedFree = [];
this.gamesCreatedPremium = [];
this.gamesPlayedDate = []
this.gamesPlayedElite = []
this.gamesPlayedFree = []
this.gamesPlayedPremium = []
this.userSubscrivedData = [];
  this.api.dashboardAllData(this.type).subscribe((data: any) => {
    // donut chart data
    this.data = data.data.top10Subjects;
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.unSubscribedUser)
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.subscribedUser)
    this.top3GamesData = data.data.top3Games
for(let data2 of data.data.top10Subjects){
  this.top10SubjectGraphData.push(data2.subject)
  this.top10SubjectValue.push(data2.gamePlays)
}
    //End Of donut chart data
    // Start user Line Chart Data 
    this.userData = data.data.users
    for(let data3 of data.data.users){
      this.userdataDate.push(data3.date)
      this.userEliteData.push(data3.elite)
      this.userFreeData.push(data3.free)
      this.userPrimiumData.push(data3.premium)
    }
 // End user Line Chart Data 
    
    // Start GameCreated Line Chart Data 
    
    for(let data4 of data.data.gamesCreated){
      this.gamesCreatedDate.push(data4.date)
      this.gamesCreatedElite.push(data4.elite)
      this.gamesCreatedFree.push(data4.free)
      this.gamesCreatedPremium.push(data4.premium)
    }
 // End GamesCreated Line Chart Data 
    // Start GamePlayed Line Chart Data 
    
    for(let data5 of data.data.gamesPlayed){
      this.gamesPlayedDate.push(data5.date)
      this.gamesPlayedElite.push(data5.elite)
      this.gamesPlayedFree.push(data5.free)
      this.gamesPlayedPremium.push(data5.premium)
    }
 // End GamePlayed Line Chart Data 
    console.log(this.userData)
    this.getLineChartOptions(this.obj)
    this.getLineChartGamesCreatedOptions(this.obj)
    this.getLineChartGamesPlayedOptions(this.obj)
    this.getLineChartOptions(this.obj)
    this.getDonutChartOptions(this.obj)
    this.getPieChartOptions(this.obj)
    this.spinner.hide();
  });
}
dailyData(){
  this.spinner.show()
  this.classVariable = 0
  this.type = "daily"
  this.top10SubjectGraphData = [];
  this. top10SubjectValue = []
this.userEliteData = [];
this.userPrimiumData = [];
this.userFreeData = [];
this.userdataDate = [];
this.gamesCreatedDate = [];
this.gamesCreatedElite = [];
this.gamesCreatedFree = [];
this.gamesCreatedPremium = [];
this.gamesPlayedDate = []
this.gamesPlayedElite = []
this.gamesPlayedFree = []
this.gamesPlayedPremium = []
this.userSubscrivedData = [];
  this.api.dashboardAllData(this.type).subscribe((data: any) => {
    // donut chart data
    this.data = data.data.top10Subjects;
    this.userSubscrivedData.push(Number(data.data.subscribedUserAndUnSubscribed.subscribedUser.toFixed(2)))
    this.userSubscrivedData.push(Number(data.data.subscribedUserAndUnSubscribed.unSubscribedUser.toFixed(2)))
    
   console.log(this.userSubscrivedData)
    this.top3GamesData = data.data.top3Games
    for(let ids of data.data.top3Games){
      
    }
for(let data2 of data.data.top10Subjects){
  this.top10SubjectGraphData.push(data2.subject)
  this.top10SubjectValue.push(data2.gamePlays)
}
    //End Of donut chart data
    // Start user Line Chart Data 
    this.userData = data.data.users
    for(let data3 of data.data.users){
      this.userdataDate.push(data3.date)
      this.userEliteData.push(data3.elite)
      this.userFreeData.push(data3.free)
      this.userPrimiumData.push(data3.premium)
    }
 // End user Line Chart Data 
    
    // Start GameCreated Line Chart Data 
    
    for(let data4 of data.data.gamesCreated){
      this.gamesCreatedDate.push(data4.date)
      this.gamesCreatedElite.push(data4.elite)
      this.gamesCreatedFree.push(data4.free)
      this.gamesCreatedPremium.push(data4.premium)
    }
 // End GamesCreated Line Chart Data 
    // Start GamePlayed Line Chart Data 
    
    for(let data5 of data.data.gamesPlayed){
      this.gamesPlayedDate.push(data5.date)
      this.gamesPlayedElite.push(data5.elite)
      this.gamesPlayedFree.push(data5.free)
      this.gamesPlayedPremium.push(data5.premium)
    }
 // End GamePlayed Line Chart Data 
    console.log(this.userData)
    this.getLineChartOptions(this.obj)
    this.getLineChartGamesCreatedOptions(this.obj)
    this.getLineChartGamesPlayedOptions(this.obj)
    this.getLineChartOptions(this.obj)
    this.getDonutChartOptions(this.obj)
    this.getPieChartOptions(this.obj)
    this.spinner.hide();
  });
}
monthlyData(){
  this.spinner.show()
  this.classVariable = 2
  this.type = "monthly"
  this.top10SubjectGraphData = [];
  this. top10SubjectValue = []
this.userEliteData = [];
this.userPrimiumData = [];
this.userFreeData = [];
this.userdataDate = [];
this.gamesCreatedDate = [];
this.gamesCreatedElite = [];
this.gamesCreatedFree = [];
this.gamesCreatedPremium = [];
this.gamesPlayedDate = []
this.gamesPlayedElite = []
this.gamesPlayedFree = []
this.gamesPlayedPremium = []
this.userSubscrivedData = [];
  this.api.dashboardAllData(this.type).subscribe((data: any) => {
    // donut chart data
    this.data = data.data.top10Subjects;
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.unSubscribedUser)
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.subscribedUser)
    this.top3GamesData = data.data.top3Games
for(let data2 of data.data.top10Subjects){
  this.top10SubjectGraphData.push(data2.subject)
  this.top10SubjectValue.push(data2.gamePlays)
}
    //End Of donut chart data
    // Start user Line Chart Data 
    this.userData = data.data.users
    for(let data3 of data.data.users){
      this.userdataDate.push(data3.date)
      this.userEliteData.push(data3.elite)
      this.userFreeData.push(data3.free)
      this.userPrimiumData.push(data3.premium)
    }
 // End user Line Chart Data 
    
    // Start GameCreated Line Chart Data 
    
    for(let data4 of data.data.gamesCreated){
      this.gamesCreatedDate.push(data4.date)
      this.gamesCreatedElite.push(data4.elite)
      this.gamesCreatedFree.push(data4.free)
      this.gamesCreatedPremium.push(data4.premium)
    }
 // End GamesCreated Line Chart Data 
    // Start GamePlayed Line Chart Data 
    
    for(let data5 of data.data.gamesPlayed){
      this.gamesPlayedDate.push(data5.date)
      this.gamesPlayedElite.push(data5.elite)
      this.gamesPlayedFree.push(data5.free)
      this.gamesPlayedPremium.push(data5.premium)
    }
 // End GamePlayed Line Chart Data 
    console.log(this.userData)
    this.getLineChartOptions(this.obj)
    this.getLineChartGamesCreatedOptions(this.obj)
    this.getLineChartGamesPlayedOptions(this.obj)
    this.getLineChartOptions(this.obj)
    this.getDonutChartOptions(this.obj)
    this.getPieChartOptions(this.obj)
    this.spinner.hide();
  });
}
yearlyData(){
  this.spinner.show()
  this.classVariable = 3
  this.type = "yearly"
  this.top10SubjectGraphData = [];
  this. top10SubjectValue = []
this.userEliteData = [];
this.userPrimiumData = [];
this.userFreeData = [];
this.userdataDate = [];
this.gamesCreatedDate = [];
this.gamesCreatedElite = [];
this.gamesCreatedFree = [];
this.gamesCreatedPremium = [];
this.gamesPlayedDate = []
this.gamesPlayedElite = []
this.gamesPlayedFree = []
this.gamesPlayedPremium = []
this.userSubscrivedData = [];
  this.api.dashboardAllData(this.type).subscribe((data: any) => {
    // donut chart data
    this.data = data.data.top10Subjects;
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.unSubscribedUser)
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.subscribedUser)
    this.top3GamesData = data.data.top3Games
for(let data2 of data.data.top10Subjects){
  this.top10SubjectGraphData.push(data2.subject)
  this.top10SubjectValue.push(data2.gamePlays)
}
    //End Of donut chart data
    // Start user Line Chart Data 
    this.userData = data.data.users
    for(let data3 of data.data.users){
      this.userdataDate.push(data3.date)
      this.userEliteData.push(data3.elite)
      this.userFreeData.push(data3.free)
      this.userPrimiumData.push(data3.premium)
    }
 // End user Line Chart Data 
    
    // Start GameCreated Line Chart Data 
    
    for(let data4 of data.data.gamesCreated){
      this.gamesCreatedDate.push(data4.date)
      this.gamesCreatedElite.push(data4.elite)
      this.gamesCreatedFree.push(data4.free)
      this.gamesCreatedPremium.push(data4.premium)
    }
 // End GamesCreated Line Chart Data 
    // Start GamePlayed Line Chart Data 
    
    for(let data5 of data.data.gamesPlayed){
      this.gamesPlayedDate.push(data5.date)
      this.gamesPlayedElite.push(data5.elite)
      this.gamesPlayedFree.push(data5.free)
      this.gamesPlayedPremium.push(data5.premium)
    }
 // End GamePlayed Line Chart Data 
    console.log(this.userData)
    this.getLineChartOptions(this.obj)
    this.getLineChartGamesCreatedOptions(this.obj)
    this.getLineChartGamesPlayedOptions(this.obj)
    this.getLineChartOptions(this.obj)
    this.getDonutChartOptions(this.obj)
    this.getPieChartOptions(this.obj)
    this.spinner.hide();
  });
}
allTimeData(){
  this.spinner.show()
  this.classVariable = 4
  this.type = "allTime"
  this.top10SubjectGraphData = [];
  this. top10SubjectValue = []
this.userEliteData = [];
this.userPrimiumData = [];
this.userFreeData = [];
this.userdataDate = [];
this.gamesCreatedDate = [];
this.gamesCreatedElite = [];
this.gamesCreatedFree = [];
this.gamesCreatedPremium = [];
this.gamesPlayedDate = []
this.gamesPlayedElite = []
this.gamesPlayedFree = []
this.gamesPlayedPremium = []
this.userSubscrivedData = [];
  this.api.dashboardAllData(this.type).subscribe((data: any) => {
    // donut chart data
    this.data = data.data.top10Subjects;
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.unSubscribedUser)
    this.userSubscrivedData.push(data.data.subscribedUserAndUnSubscribed.subscribedUser)
    this.top3GamesData = data.data.top3Games
for(let data2 of data.data.top10Subjects){
  this.top10SubjectGraphData.push(data2.subject)
  this.top10SubjectValue.push(data2.gamePlays)
}
    //End Of donut chart data
    // Start user Line Chart Data 
    this.userData = data.data.users
    for(let data3 of data.data.users){
      this.userdataDate.push(data3.date)
      this.userEliteData.push(data3.elite)
      this.userFreeData.push(data3.free)
      this.userPrimiumData.push(data3.premium)
    }
 // End user Line Chart Data 
    
    // Start GameCreated Line Chart Data 
    
    for(let data4 of data.data.gamesCreated){
      this.gamesCreatedDate.push(data4.date)
      this.gamesCreatedElite.push(data4.elite)
      this.gamesCreatedFree.push(data4.free)
      this.gamesCreatedPremium.push(data4.premium)
    }
 // End GamesCreated Line Chart Data 
    // Start GamePlayed Line Chart Data 
    
    for(let data5 of data.data.gamesPlayed){
      this.gamesPlayedDate.push(data5.date)
      this.gamesPlayedElite.push(data5.elite)
      this.gamesPlayedFree.push(data5.free)
      this.gamesPlayedPremium.push(data5.premium)
    }
 // End GamePlayed Line Chart Data 
    console.log(this.userData)
    this.getLineChartOptions(this.obj)
    this.getLineChartGamesCreatedOptions(this.obj)
    this.getLineChartGamesPlayedOptions(this.obj)
    this.getLineChartOptions(this.obj)
    this.getDonutChartOptions(this.obj)
    this.getPieChartOptions(this.obj)
    this.spinner.hide();
  });
}

// user Line Chart start

getLineChartOptions(obj: any) {
  this.userChart = {
    series: [
      {
        name: "Free",
        data: this.userFreeData
      },
      {
        name: "Premium",
        data: this.userPrimiumData
      },
      {
        name:
          "Elite",
        data: this.userEliteData
      }
    ],
    chart: {
      type: "line",
      height: '320',
      width: "1100",
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: ["#EE6002", "#6200EE", "#26A69A"],
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
     date:this.userdataDate,
      categories: this.userdataDate,
      labels: {
        rotate: -45,
        offsetX: 3,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
          cssClass: 'x-axis-label'
        }
      },
      lines: {
        show: true
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
  }
};

// user Line Chart End

// GamePlayed Line Chart start

getLineChartGamesCreatedOptions(obj: any) {
  this.gamesCreatedChart = {
    series: [
      {
        name: "Free",
        data: this.gamesCreatedFree
      },
      {
        name: "Premium",
        data: this.gamesCreatedPremium
      },
      {
        name:
          "Elite",
        data: this.gamesCreatedElite
      }
    ],
    chart: {
      type: "line",
      height: '320',
      width: "1100",
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: ["#EE6002", "#6200EE", "#26A69A"],
    grid: {
      padding: {
        bottom: -4
      },
  
      borderColor: obj.gridBorder
    },
    xaxis: {
      date:this.gamesCreatedDate,
       categories: this.gamesCreatedDate,
       labels: {
        rotate: -45,
        offsetX: 4,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
          cssClass: 'x-axis-label',
          // fontWeight: 'bold'
        }
      },
       lines: {
         show: true
       },
       axisBorder: {
         color: obj.gridBorder,
       },
       axisTicks: {
         color: obj.gridBorder,
       },
     },
  
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
  }
};

// user Line Chart End

// GameCreated Line Chart start

getLineChartGamesPlayedOptions(obj: any) {
  this.gamesPlayedChart = {
    series: [
      {
        name: "Free",
        data: this.gamesPlayedFree
      },
      {
        name: "Premium",
        data: this.gamesPlayedPremium
      },
      {
        name: "Elite",
        data: this.gamesPlayedElite
      }
    ],
    chart: {
      type: "line",
      height: '320',
      width: "1100",
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      }
    },
    colors: ["#EE6002", "#6200EE", "#26A69A"],
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: this.gamesPlayedDate,
      labels: {
        rotate: -45,
        offsetX: 3,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
          cssClass: 'x-axis-label'
        }
      },
      axisBorder: {
        color: obj.gridBorder
      },
      axisTicks: {
        color: obj.gridBorder
      }
    },
    yaxis: {
      labels: {
        offsetX: 0,
        style: {
          fontSize: '12px',
          fontFamily: obj.fontFamily
        }
      }
    },
    markers: {
      size: 0
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      }
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    }
  };
}




// user Line Chart End
/**
 * Donut chart options
 */
getDonutChartOptions(obj: any) {
  // Assuming top10SubjectValue is your array
  const valuesWithPercentage = this.top10SubjectValue.map((value: number) => `${value}%`);
console.log("vivek",this.top10SubjectValue)
  this.donutChart = {
    series:this.top10SubjectValue,
    labels: this.top10SubjectGraphData,
    chart: {
      height: 300,
      width: 380,
      type: "donut",
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: ["#EB5757","#4CD964","#BB6BD9", "#2D9CDB","#00B2A9","#A84069","#EAAB00","#8D43FF","#9D43FF","green"],
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    plotOptions: {
      donut: {
        startAngle: 0, // Start angle for the chart (center-aligned)
        endAngle: 0,   // End angle for the chart (center-aligned)
      },
    },
   
    
    
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'left',
      fontFamily: obj.fontFamily,
      fontSize: "12px",
      fontWeight:400,
      itemMargin: {
        horizontal: 2,
        vertical: 0
      },
      markers: {
        width: 10,
        height: 10,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 2,
        offsetY: 0
    },
    
    },
    dataLabels: {
      enabled: true
    }
  }
  
};



/**
 * Pie chart options
 */
getPieChartOptions(obj: any) {
  this.userSubscrivedChart = {
    series:this.userSubscrivedData,
    chart: {
      height: 300,
      width: "400",
      type: "pie",
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    labels:["Subscribed","Unsubscribed"],
    colors: ["#FFBD00","#000000"],
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    grid: {
      padding: {
        bottom: -4,
        top:25
      }
    },
    
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'left',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 20,
      },
    },
    dataLabels: {
      enabled: true
    }
  }
};
handleBackImg(id){
  console.log(id)
  let url = "url('../../../../assets/images/Use it or lose it.png')"
  if(id === 'Use it or Lose it'){
    return url
  }
  let url2 = "url('../../../../assets/images/Knowledge is power.png')"
  if(id === 'Knowledge is Power'){
    return url2
  }
  let url3 = "url('../../../../assets/images/Cognitive Connection.png')"
  if(id === 'Cognitive Connections'){
    return url3
  }
  let url4 = "url('../../../../assets/images/Brainfood.png')"
  if(id === 'Brain food'){
    return url4
  }
}
}
