const cloneData = [
  {
    value:
      "Ý tớ là tớ nói thích cậu thì đó là lựa chọn của tớ, tớ sẳn sàng chấp nhận hậu quả, chứ không không phải là muốn thấy cậu đứng đó vẫy cờ rồi nói cậu không xứng với tớ...",
  },
];

$(document).ready(function () {
  // Khởi tạo ban đầu và thêm tooltip cho các máy bay và nút bấm
  tippy("#originalPlane", {
    content: "Author: DevT",
  });
  tippy("#btnAddPlane", {
    content: "Thêm những lời bạn muốn nói!",
  });

  // Sử dụng vòng lặp để tạo các máy bay từ dữ liệu
  cloneData.forEach(function (item, index) {
    createPlane(item, index);
  });

  // Bắt sự kiện click cho nút "Thêm Máy Bay"
  $("#btnAddPlane").on("click", function () {
    Swal.fire({
      title: "Những điều bạn muốn nói!",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Thả vào gió!",
      confirmButtonColor: "#5AB2FF",
      showLoaderOnConfirm: true,
      cancelButtonText: "Thoát",
      preConfirm: async (login) => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const value = result.value;
        if (value) {
          let planeCount = $("a[name='planeMsg']").length;
          let item = { value: value };
          createPlane(item, planeCount);
        }
      }
    });
  });

  // Event delegation cho click event của máy bay mới thêm
  $(".frame").on("click", "a[name='planeMsg']", function () {
    const value = $(this).attr("data-msg");
    Swal.fire({
      title: "Lời nhắn của gió",
      text: value,
      confirmButtonColor: "#5AB2FF",
    });
  });

  // Hàm để tạo máy bay
  function createPlane(item, index) {
    let newPlane = $("#originalPlane")
      .clone()
      .removeAttr("id")
      .attr("id", `plane-clone-${index}`)
      .attr("name", "planeMsg")
      .attr("data-msg", item.value);
    let randomWidth = Math.random() * 100 + 50;
    let randomTranslateX = Math.random() * 500 - 250;
    let randomTranslateY = Math.random() * 200 - 100;
    let animationName = `animation-${index}`;

    newPlane
      .css({
        width: `${randomWidth}px`,
        transform: `translate(${randomTranslateX}px, ${randomTranslateY}px)`,
        "animation-name": animationName,
        "animation-duration": `${Math.random() * 5 + 5}s`,
        "animation-timing-function": "ease-in-out",
        "animation-iteration-count": "infinite",
        "animation-direction": "alternate",
      })
      .appendTo(".frame .plane-container");

    tippy(`#plane-clone-${index}`, {
      content: `${item.value}`,
    });

    createKeyframes(animationName);
  }

  // Hàm tạo keyframes
  function createKeyframes(name) {
    let degree1 = Math.random() * 30 - 5;
    let degree2 = Math.random() * 30 - 5;
    let keyframes = `
        @keyframes ${name} {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(50px) rotate(${degree1}deg); }
            100% { transform: translateY(-50px) rotate(${degree2}deg); }
        }
      `;
    $("head").append(`<style>${keyframes}</style>`);
  }
});
