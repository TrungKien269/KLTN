import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { withRouter, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { checkUserEBook } from "../../Utils/Commons";
import Viewer, {
  SelectionMode,
  Worker,
  defaultLayout,
  RenderPage,
} from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

function ReadEBook(props) {
  const { id = "" } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkUserEBook().then((res) => {
      if (res.status === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.message,
        }).then(() => {
          props.history.push("/rentebook/");
        });
      }
    });

    axios({
      method: "get",
      url: "http://localhost:5000/api/EBook/GetEBook/",
      params: {
        id: id,
      },
    }).then((res) => {
      if (res.data.status) {
        // setLink("http://localhost:5000/Files/ebooks/"+ res.data.obj.category + "/" +
        // res.data.obj.id + ".pdf");
        setLink(
          `http://localhost:5000/Files/ebooks/${res.data.obj.category}/${res.data.obj.id}.pdf`
        );
      }
    });
  }, []);

  const renderToolbar = (toolbarSlot) => {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={{ padding: "0 2px" }}>
            {toolbarSlot.toggleSidebarButton}
          </div>
          <div style={{ padding: "0 2px" }}>{toolbarSlot.searchPopover}</div>
          <div style={{ padding: "0 2px" }}>
            {toolbarSlot.previousPageButton}
          </div>
          <div style={{ padding: "0 2px" }}>
            {toolbarSlot.currentPageInput} / {toolbarSlot.numPages}
          </div>
          <div style={{ padding: "0 2px" }}>{toolbarSlot.nextPageButton}</div>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            flexShrink: 1,
            justifyContent: "center",
          }}
        >
          <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomOutButton}</div>
          <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomPopover}</div>
          <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomInButton}</div>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginLeft: "auto",
          }}
        >
          <div style={{ padding: "0 2px" }}>{toolbarSlot.fullScreenButton}</div>
          <div style={{ padding: "0 2px" }}>
            {toolbarSlot.moreActionsPopover}
          </div>
        </div>
      </div>
    );
  };

  const layout = (isSidebarOpened, container, main, toolbar, sidebar) => {
    return defaultLayout(
      isSidebarOpened,
      container,
      main,
      toolbar(renderToolbar),
      sidebar
    );
  };

  const renderPage = (props) => {
    return (
      <div>
        {props.canvasLayer.children}
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "rgba(0, 0, 0, 0.2)",
              fontSize: `${4 * props.scale}rem`,
              fontWeight: "bold",
              textTransform: "uppercase",
              transform: "rotate(-45deg)",
              userSelect: "none",
            }}
          >
            Book Store
          </div>
        </div>
        {props.annotationLayer.children}
        {props.textLayer.children}
      </div>
    );
  };

  const DisplayFile = useMemo(() => {
    if (link != null) {
      return (
        <div
          style={{
            height: "90vh",
            width: "96%",
            transform: "translateX(-50%)",
            marginLeft: "50%",
            fontSize: "18px",
          }}
        >
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js">
            <Viewer
              fileUrl={
                "http://localhost:5000/Files/ebooks/Economic/10554108.pdf"
              }
              defaultScale={1}
              selectionMode={SelectionMode.Text}
              layout={layout}
              renderPage={renderPage}
            />
          </Worker>
        </div>
      );
    }
  }, [link]);

  return <div>{DisplayFile}</div>;
}

export default withRouter(ReadEBook);
