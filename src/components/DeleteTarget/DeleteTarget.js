import useMap from 'hooks/useMap';
import { targetsService } from 'services';

import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import COMPONENT_NAMES from 'constants/components';

import target from 'assets/icons/target.svg';

const CreateTarget = ({ onContinue }) => {
  const {
    selectedRadius,
    selectedTargetId,
    targets,
    setTargets,
    topicsList,
    topicId,
    title,
  } = useMap();

  const deleteTarget = async () => {
    const deleted = await targetsService.delete(selectedTargetId);
    if (deleted) {
      setTargets(
        targets.filter(({ target }) => target.id !== selectedTargetId),
      );
      onContinue(COMPONENT_NAMES.CHAT);
    } else {
      alert('Error deleting target');
    }
  };

  return (
    <div className="create-target">
      <div className="create-target__container">
        <img src={target} alt="target" className="create-target__icon" />
        <h1 className="create-target__title">delete target</h1>

        <form className="create-target__form" onSubmit={deleteTarget}>
          <FormInput
            type="number"
            name="radius"
            className="create-target__input"
            label="specify area length"
            value={selectedRadius}
            disabled
          />

          <FormInput
            type="text"
            name="title"
            className="create-target__input"
            label="target title"
            value={title}
            disabled
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label="select a topic"
            value={topicId}
            disabled
          />

          <button
            type="submit"
            className="create-target__delete btn create-target__btn-primary"
          >
            delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTarget;
