/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mpmedia.observer;

import java.util.List;

/**
 *
 * @author mark prades
 */
interface IObservableCollection<T> extends List<T> {
    List<T> getItems();
    void setItems(List<T> items);
}
