import React, { useEffect, useState } from 'react'

const CreateUpdateTaskForm = ({ data, modalId }) => {
  const [title, setTitle] = useState('');
  const [storyline, setStoryline] = useState('');


  useEffect(() => {
    if(data) {
      setTitle(data?.title)
      setStoryline(data?.storyline)
    }
  }, [data])

  const openModal = (mId) => {
    const modal = document.getElementById(mId);

    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }

  const closeModal = (mId) => {
    const modal = document.getElementById(mId);
    if(getComputedStyle(modal).display==="flex") {
      modal.classList.add("modal-hide");
      setTimeout(() => {
        document.body.style.overflow = "initial";
        modal.classList.remove("modal-show", "modal-hide");
        modal.style.display = "none";      
      }, 200);
    }
  }

  useEffect(() => {  
    const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
    const modalCloseButtons = document.querySelectorAll(".modal-close");

    modalTriggerButtons.forEach(modalTriggerButton => {
      modalTriggerButton.addEventListener("click", () => openModal(modalTriggerButton.getAttribute("data-modal-target")));
    });
    modalCloseButtons.forEach(modalCloseButton => {
      modalCloseButton.addEventListener("click", event => closeModal(event.currentTarget.closest(".modal").id));
    });

    return () => {
      modalTriggerButtons.forEach(modalTriggerButton => {
        modalTriggerButton.removeEventListener("click", () => openModal(modalTriggerButton.getAttribute("data-modal-target")));
      });
      modalCloseButtons.forEach(modalCloseButton => {
        modalCloseButton.removeEventListener("click", event => closeModal(event.currentTarget.closest(".modal").id));
      });
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

  }

  return (
    <div className="modal" id={modalId}>
      <div className="modal-content">
        <span className="modal-close">&times;</span>
        <h3>{data?.id ? 'Update' : 'Create'} Show</h3>
        <form autoComplete='false' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="storyline">Storyline:</label>
            <textarea type="text" id="storyline" name="storyline" value={storyline} onChange={e => setStoryline(e.target.value)}></textarea>
          </div>
        
          <div>
            <label>Available In:</label>
            <div className='options-wrapper'>
              {/* {platforms.data?.map(platform => (
                <div key={platform.id}>
                  <input type="checkbox" id={platform.name} value={platform.name} name="platforms" checked={availablePlatforms.includes(platform.name)} onChange={() => handleCheckboxChange(platform.name)} />
                  <label className="light" htmlFor={platform.name}>{platform.name}</label><br />
                </div>
              ))} */}
            </div>
          </div>
            
          <button className="submit" type="submit">{data?.id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUpdateTaskForm