$(document).ready(function() {
  let start = false;
  let elevatorCount = 0;
  let floorsCount = 0;
  let data = new Object(); // bien data de chu du so luong tan va thang may
  data.elevator = []; // lua so luong thang may trong bien data
  $("#confirm").click(function() {
      // lay gia tri cua 2 input so luong tan va so luong thang may
      var numberEle = $("#ne").val();
      var numberFlo = $("#nf").val();
      // validate input
      if (numberEle == '') {
          alert("The elevators number cannot be empty");
          return;
      }
      if (numberFlo == '') {
          alert("Number of floors must not be empty");
          return;
      }
      // gan 2 gia tri va bat dau tro choi
      elevatorCount = numberEle;
      floorsCount = numberFlo;
      start = true;

      // hien thi form giao dien elevator
      elevatorScreen()
  });

  function elevatorScreen() {
      $(".wrapper").html("");

      // duyet qua so tang va them vao bien data
      for (var i = 0; i < elevatorCount; i++) {
          data.elevator[i] = {
              "count": floorsCount,
              "limit": 0, // gioi han tang
              "floors": 1, // so tang ban dau
              "up": true // status cua thang may
          };
      }

      // hien thi form
      var html = "";
      for (var i = 0; i < elevatorCount; i++) {
          html += '<div class="elevators_css" id="elevators_' + i + '" style="flex-grow: 1">';
          html += '<p>elevators ' + (i + 1) + '</p>';
          // hien thi so tang
          for (var a = floorsCount; a >= 1; a--) {
              html += '<li class="elevators_' + i + '" id="elevators_' + i + '_' + a + '">floors ' + (a);
              html += '<p>closed</p><input type="checkbox" id="elevators_' + i + '_' + a + '_check" name="vehicle1" value="Bike">';
              html += '</li>';
          }
          html += '</div>';
      }

      // lay the elevator_display va bind form vua tinh toan vao
      $('.elevator_display').html(html);

      // tao ra 1 ham start de biet duoc thang may di tu tang nao den tang nao
      startElevator();
  }

  function startElevator() {
      // vi co nhieu thang may nen ta se dung 1 hamg run de hien thi nhieu thang may dang hoat dong voi so tang tuong ung
      // duyet qua so thang may dang co
      for (var item = 0; item < elevatorCount; item++) {
          runElevators(item);
      }

  }

  function removeDoors(id) {
      $(id).html('closed');
  }

  function runElevators(item) {
      // kiem tra status, limit
      // Truong hop 1 : so tang hien tai nho hon so tan trong data
      if (data.elevator[item].up == true && data.elevator[item].floors < floorsCount && data.elevator[item].limit < 20) {
          data.elevator[item].floors += 1;
          $(".elevators_" + item).attr("style", "background:#fff;"); // tang hien tai
          $("#elevators_" + item + "_" + data.elevator[item].floors).attr("style", "background:red"); // tang dang up
          if ($("#elevators_" + item + "_" + data.elevator[item].floors + '_check').attr('checked')) {
              $("#elevators_" + item + "_" + data.elevator[item].floors + " p").html('open');
              $("#elevators_" + item + "_" + data.elevator[item].floors + '_check').attr('checked', false);
              setTimeout(() => removeDoors("#elevators_" + item + "_" + data.elevator[item].floors + " p"), 3000);
              setTimeout(() => runElevators(item), 3000);
          } else {
              setTimeout(() => runElevators(item), 1000);
          }


      } // truong hop 2 : so tang hien tai bang  so tan trong data
      else if(data.elevator[item].up == true && data.elevator[item].floors == floorsCount  && data.elevator[item].limit < 20 ){
        data.elevator[item].up = false;
        data.elevator[item].floors -= 1;
        $(".elevators_"+item).attr("style","background:#fff;");
        $("#elevators_"+item+"_"+data.elevator[item].floors).attr("style","background:red;");
        if($("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked')){
            $("#elevators_"+item+"_"+data.elevator[item].floors+" p").html('open');
            $("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked',false);
            setTimeout(()=>removeDoors("#elevators_"+item+"_"+data.elevator[item].floors+" p"), 3000);
            setTimeout(()=>runElevators(item), 3000);
        }else{
            setTimeout(()=>runElevators(item), 1000);
        }
    } // truong hop 3 :  so tan trong data > 1
    else if(data.elevator[item].up == false && data.elevator[item].floors > 1  && data.elevator[item].limit < 20){
        data.elevator[item].up = false;
        data.elevator[item].floors -= 1;
        $(".elevators_"+item).attr("style","background:#fff;");
        $("#elevators_"+item+"_"+data.elevator[item].floors).attr("style","background:red;");
        if($("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked')){
            $("#elevators_"+item+"_"+data.elevator[item].floors+" p").html('open');
            $("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked',false);
            setTimeout(()=>removeDoors("#elevators_"+item+"_"+data.elevator[item].floors+" p"), 3000);
            setTimeout(()=>runElevators(item), 3000);
        }else{
            setTimeout(()=>runElevators(item), 1000);
        }
    }  // truong hop 4 :  so tan trong data == 1
    else if(data.elevator[item].up == false && data.elevator[item].floors == 1  && data.elevator[item].limit < 100){
        data.elevator[item].up = true;
        data.elevator[item].floors += 1;
        data.elevator[item].limit += 1;
        $(".elevators_"+item).attr("style","background:#fff;");
        $("#elevators_"+item+"_"+data.elevator[item].floors).attr("style","background:red;");
        if($("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked')){
            $("#elevators_"+item+"_"+data.elevator[item].floors+" p").html('open');
            $("#elevators_"+item+"_"+data.elevator[item].floors+'_check').attr('checked',false);
            setTimeout(()=>removeDoors("#elevators_"+item+"_"+data.elevator[item].floors+" p"), 3000);
            setTimeout(()=>runElevators(item), 3000);
        }else{
            setTimeout(()=>runElevators(item), 1000);
        }
    }else{
        alert("Thang máy số "+(item + 1)+" can khoi dong lai");
    }
  }
});